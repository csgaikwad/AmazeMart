require('dotenv').config({ path: '../.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Seed Users
    const users = await prisma.user.createMany({
      data: [
        { email: 'user1@example.com', password: 'password1', name: 'User One', pictureUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp', role: 'USER' },
        { email: 'user2@example.com', password: 'password2', name: 'User Two', pictureUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp', role: 'USER' },
        { email: 'user3@example.com', password: 'password3', name: 'User Three', pictureUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp', role: 'USER' },
      ],
    });

    const userIds = await prisma.user.findMany({ select: { id: true, email: true } });

    // Seed Categories
    const categories = await prisma.category.createMany({ data: [{ name: 'Men' }, { name: 'Women' }, { name: 'Kids' }] });
    const categoryIds = await prisma.category.findMany({ select: { id: true, name: true } });

    // Seed Products
    const productsData = [
      { title: "Men's T-Shirt", description: "Comfortable and stylish.", price: 25.99, rating: 4.5, totalReviews: 120 },
      { title: "Women's Dress", description: "Elegant dress for any occasion.", price: 59.99, rating: 4.7, totalReviews: 90 },
      { title: "Kids' Hoodie", description: "Warm and cozy hoodie for kids.", price: 35.99, rating: 4.3, totalReviews: 150 },
    ];
    await prisma.product.createMany({ data: productsData });

    const products = await prisma.product.findMany({ select: { id: true, title: true } });

    // Seed Images
    await prisma.image.createMany({
      data: products.map((product) => ({
        productId: product.id,
        imageUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp',
      })),
    });

    // Seed Reviews
    await prisma.review.createMany({
      data: userIds.map((user, index) => ({
        userId: user.id,
        productId: products[index].id,
        stars: 5,
        comment: `Great product - ${products[index].title}`,
      })),
    });

    // Seed Wishlist
    await prisma.wishlist.createMany({
      data: userIds.map((user, index) => ({
        userId: user.id,
        productId: products[(index + 1) % products.length].id,
      })),
    });

    // Seed Cart
    await prisma.cart.createMany({
      data: userIds.map((user, index) => ({
        userId: user.id,
        productId: products[index].id,
        title: products[index].title,
        price: products[index].price,
        productImg: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp',
      })),
    });

    // Seed Orders
    await prisma.order.createMany({
      data: userIds.map((user, index) => ({
        userId: user.id,
        email: user.email,
        phoneNo: `12345678${index}`,
        address: `${index + 1} Main St`,
        city: 'New York',
        state: 'NY',
        country: 'USA',
        pincode: '1000' + index,
        itemsPrice: products[index].price,
        taxPrice: 5.0,
        shippingPrice: 5.0,
        totalPrice: products[index].price + 10,
        paymentId: `pay_${index + 1}`,
        paymentStatus: 'PAID',
        orderStatus: 'PROCESSING',
      })),
    });

    const orders = await prisma.order.findMany({ select: { id: true, paymentId: true } });

    // Seed Order Items
    await prisma.orderItem.createMany({
      data: orders.map((order, index) => ({
        orderId: order.id,
        productId: products[index].id,
        title: products[index].title,
        price: products[index].price,
        quantity: 1,
        image: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/photo.webp',
      })),
    });

    // Seed Category on Products
    await prisma.categoryOnProduct.createMany({
      data: products.map((product, index) => ({
        productId: product.id,
        categoryId: categoryIds[index].id,
      })),
    });

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
