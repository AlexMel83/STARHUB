<script setup>
const { cart, removeFromCart } = inject("cart");
</script>

<template>
  <div class="grid grid-cols-1 gap-2 flex-1" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
