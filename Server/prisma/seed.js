require('dotenv').config({ path: '../.env' }); // Ensure the correct path
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        password: 'password1',
        name: 'User One',
        pictureUrl: 'https://res-console.cloudinary.com/djaobjfxt/media_explorer_thumbnails/db7c55318d52e8c808ac18001e5951b0/detailed',
        role: 'USER',
      },
      {
        email: 'user2@example.com',
        password: 'password2',
        name: 'User Two',
        pictureUrl: 'https://res-console.cloudinary.com/djaobjfxt/media_explorer_thumbnails/db7c55318d52e8c808ac18001e5951b0/detailed',
        role: 'USER',
      },
      {
        email: 'user3@example.com',
        password: 'password3',
        name: 'User Three',
        pictureUrl: 'https://res-console.cloudinary.com/djaobjfxt/media_explorer_thumbnails/db7c55318d52e8c808ac18001e5951b0/detailed',
        role: 'USER',
      },
    ],
  });

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Men' },
      { name: 'Women' },
      { name: 'Kids' },
    ],
  });

  // Seed Products
  const products = await prisma.product.createMany({
    data: [
      {
        title: 'Men\'s T-Shirt',
        description: 'Comfortable and stylish men\'s t-shirt.',
        price: 25.99,
        rating: 4.5,
        totalReviews: 120,
      },
      {
        title: 'Women\'s Dress',
        description: 'Elegant women\'s dress for any occasion.',
        price: 59.99,
        rating: 4.7,
        totalReviews: 90,
      },
      {
        title: 'Kids\' Hoodie',
        description: 'Warm and cozy hoodie for kids.',
        price: 35.99,
        rating: 4.3,
        totalReviews: 150,
      },
    ],
  });

  // Seed Images for Products
  const images = await prisma.image.createMany({
    data: [
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
        imageUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
        imageUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
        imageUrl: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
    ],
  });

  // Seed Reviews
  const reviews = await prisma.review.createMany({
    data: [
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user1@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
        stars: 5,
        comment: 'Great fit and comfortable!',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user2@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
        stars: 4,
        comment: 'Beautiful dress, perfect for parties.',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user3@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
        stars: 5,
        comment: 'My kid loves it! Very warm.',
      },
    ],
  });

  // Seed Wishlist
  const wishlist = await prisma.wishlist.createMany({
    data: [
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user1@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user2@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user3@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
      },
    ],
  });

  // Seed Cart
  const cart = await prisma.cart.createMany({
    data: [
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user1@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
        title: 'Kids\' Hoodie',
        price: 35.99,
        productImg: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user2@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
        title: 'Men\'s T-Shirt',
        price: 25.99,
        productImg: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user3@example.com' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
        title: 'Women\'s Dress',
        price: 59.99,
        productImg: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
    ],
  });

  // Seed Orders
  const orders = await prisma.order.createMany({
    data: [
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user1@example.com' } })).id,
        email: 'user1@example.com',
        phoneNo: '1234567890',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        pincode: '10001',
        itemsPrice: 35.99,
        taxPrice: 3.60,
        shippingPrice: 5.00,
        totalPrice: 44.59,
        paymentId: 'pay_123456',
        paymentStatus: 'PAID',
        orderStatus: 'PROCESSING',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user2@example.com' } })).id,
        email: 'user2@example.com',
        phoneNo: '0987654321',
        address: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        pincode: '90001',
        itemsPrice: 25.99,
        taxPrice: 2.60,
        shippingPrice: 5.00,
        totalPrice: 33.59,
        paymentId: 'pay_654321',
        paymentStatus: 'PAID',
        orderStatus: 'SHIPPED',
      },
      {
        userId: (await prisma.user.findFirst({ where: { email: 'user3@example.com' } })).id,
        email: 'user3@example.com',
        phoneNo: '1122334455',
        address: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        pincode: '60601',
        itemsPrice: 59.99,
        taxPrice: 6.00,
        shippingPrice: 5.00,
        totalPrice: 70.99,
        paymentId: 'pay_987654',
        paymentStatus: 'PAID',
        orderStatus: 'DELIVERED',
      },
    ],
  });

  // Seed OrderItems
  const orderItems = await prisma.orderItem.createMany({
    data: [
      {
        orderId: (await prisma.order.findFirst({ where: { paymentId: 'pay_123456' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
        title: 'Kids\' Hoodie',
        price: 35.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        orderId: (await prisma.order.findFirst({ where: { paymentId: 'pay_654321' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
        title: 'Men\'s T-Shirt',
        price: 25.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
      {
        orderId: (await prisma.order.findFirst({ where: { paymentId: 'pay_987654' } })).id,
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
        title: 'Women\'s Dress',
        price: 59.99,
        quantity: 1,
        image: 'https://res.cloudinary.com/djaobjfxt/image/upload/v1710418147/property-photos/property-photos/photo-1710418144136.webp',
      },
    ],
  });

  // Seed CategoryOnProduct
  const categoryOnProduct = await prisma.categoryOnProduct.createMany({
    data: [
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Men\'s T-Shirt' } })).id,
        categoryId: (await prisma.category.findFirst({ where: { name: 'Men' } })).id,
      },
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Women\'s Dress' } })).id,
        categoryId: (await prisma.category.findFirst({ where: { name: 'Women' } })).id,
      },
      {
        productId: (await prisma.product.findFirst({ where: { title: 'Kids\' Hoodie' } })).id,
        categoryId: (await prisma.category.findFirst({ where: { name: 'Kids' } })).id,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });