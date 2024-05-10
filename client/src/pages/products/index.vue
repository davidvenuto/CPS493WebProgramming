<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { type Product, getProducts } from "@/model/products";
    import ProductCard from '@/components/ProductCard.vue';
    import FlyOut from '@/components/FlyOut.vue';
    import { addToCart, isOpen } from '@/viewModel/cart';
    import ShoppingCart from '@/components/ShoppingCart.vue';


    const products = ref([] as Product[])
    
    getProducts()
    .then((data) => {
        if(data){
            products.value = data.data
        }
    })


</script>

<template>
    <div class="product-list">
        <ProductCard    v-for="product in products" :key="product.id"
                        :product="product" @addToCart="addToCart"
                    />
    </div>

    <FlyOut :isOpen="isOpen" >
        <ShoppingCart />
    </FlyOut>
</template>

<style scoped>
    .product-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>