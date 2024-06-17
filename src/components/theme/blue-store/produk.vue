<template>
  <div class="bg-slate-100">
    <div class="mx-auto min-h-full max-w-md">
      <div class="min-h-screen bg-white pb-16">
        <!-- Navbar -->
        <div class="bg-sky-100 mx-0 my-0 py-4 sticky top-0 z-50">
          <!-- Navbar search -->
          <div class="flex items-center justify-center">
            <div class="relative flex items-center bg-white rounded-full shadow-md mx-4 max-w-2xl w-full p-2">
              <img src="../../../assets/seaarch.png" alt="Search Icon" class="h-6 w-6 ml-3" />
              <input
                class="placeholder:italic placeholder:text-slate-300 block bg-transparent w-full border-none rounded-full pl-3 pr-3 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Temukan Produk yang Anda Inginkan"
                type="text"
                name="search"
                v-model="searchQuery"
                @input="filterItems"
              />
              <img src="../../../assets/linkyi.svg" alt="Bag Icon" class="h-6 w-6 mr-3" />
            </div>
          </div>
        </div>

        <!-- Content section -->
        <div class="bg-sky-100 p-6 mt-0">
          <div class="flex items-center mb-4">
            <img src="../../../assets/lenterakopi.svg" alt="Logo" class="h-30 w-40 mr-2" />
            <div>
              <h2 class="text-xl font-bold text-left">Lentera Kopi</h2>
              <p class="text-sm text-justify text-gray-500">
                Lentera Kopi hadir untuk menerangi semangat belajar dan mengerjakan final project Anda.
                Nikmati lentera kopi setiap Anda ingin mengerjakan tugas dan final project.
              </p>
            </div>
          </div>
        </div>
        <!-- End Navbar -->

        <!-- Categories Section -->
        <div class="grid justify-items-stretch mt-4">
          <ul class="flex space-x-2 px-3 py-2">
            <li
              v-for="category in categories"
              :key="category"
              :class="{ 'bg-sky-200 text-sky-900': selectedCategory === category, 'bg-white text-slate-600': selectedCategory !== category }"
              class="py-1 px-3 rounded-lg shadow cursor-pointer"
              @click="selectCategory(category)"
            >
              {{ category }}
            </li>
            <li class="relative py-1 px-3 bg-white text-slate-600 rounded-lg shadow cursor-pointer" @click="toggleDropdown">
              ▼
              <ul v-if="isDropdownVisible" class="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-lg w-max dropdown-menu">
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Cappuccino')">Cappuccino</li>
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Espresso')">Espresso</li>
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Affogato')">Affogato</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <!-- Coffee Menu Section -->
        <div class="grid grid-cols-2 gap-4 p-4 ">
          <div
            class="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
            v-for="item in filteredCoffeeItems"
            :key="item.name"
            @click="showPopup(item)"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-32 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-bold">{{ item.name }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <p class="text-gray-800 mt-2">{{ item.price }}</p>
              <div class="flex items-center mt-2">
                <span class="ml-1 text-yellow-500">{{ item.rating }}</span>
              </div>
            </div>
          </div>
        </div>

        <CoffeeDetailPopup
          v-if="showPopupDetail"
          :coffeeItem="selectedCoffeeItem"
          @close="closePopupDetail"/>

        <!-- Navbar button -->
        <div class="fixed bottom-0 left-0 right-0 mx-auto max-w-md z-50 bg-sky-300">
          <div class="flex justify-center py-2">
            <ul class="flex space-x-20 font-semibold">
              <router-link to="/produk" exact class="nav-link py-2 px-8 bg-white text-sky-900 rounded-md shadow text-semibold">Produk</router-link>
              <router-link to="/akun" exact class="nav-link py-2 px-8 bg-white text-sky-900 rounded-md shadow text-semibold">Linkyi</router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoffeeDetailPopup from './CoffeeDetailPopup.vue';
import mocca from '../../../assets/mocca.svg';
import flat from '../../../assets/flat.svg';
import musi from '../../../assets/musi.svg';
import panna from '../../../assets/panna.svg';
import Espresso from '../../../assets/Espresso.jpeg';
import Cappucino from '../../../assets/Cappucino.jpeg';

export default {
  name: 'CoffeeMenu',
  components: {
    CoffeeDetailPopup
  },
  data() {
    return {
      searchQuery: '',
      isDropdownVisible: false,
      selectedCategory: 'All Coffee',
      categories: ['All Coffee', 'Macchiato', 'Latte', 'Americano'],
      coffeeItems: [
        {
          name: "Caffe Mocha",
          description: "Deep Foam",
          price: "RP 22.000",
          image: mocca,
          category: 'Latte'
        },
        {
          name: "Flat White",
          description: "Espresso",
          price: "RP 20.000",
          image: flat,
          category: 'Latte'
        },
        {
          name: "Mocha Fusi",
          description: "Ice/Hot",
          price: "RP 19.000",
          image: musi,
          category: 'Macchiato'
        },
        {
          name: "Caffe Panna",
          description: "Ice/Hot",
          price: "RP 24.000",
          image: panna,
          category: 'Americano'
        },
        {
          name: "Espresso",
          description: "Ice/Hot",
          price: "RP 25.000",
          image: Espresso,
          category: 'Espresso'
        },
        {
          name: "Cappucino",
          description: "Ice/Hot",
          price: "RP 20.000",
          image: Cappucino,
          category: 'Cappuccino'
        },
      ],
      showPopupDetail: false,
      selectedCoffeeItem: null,
    };
  },
  computed: {
    filteredCoffeeItems() {
      return this.coffeeItems.filter(item => {
        const matchesCategory = this.selectedCategory === 'All Coffee' || item.category === this.selectedCategory;
        const matchesSearchQuery = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
      });
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      console.log('Dropdown Status:', this.isDropdownVisible); //bug
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.isDropdownVisible = false;
      console.log(' Selected Category:', this.selectedCategory);
    },
    filterItems() {
    },
    showPopup(item) {
      this.selectedCoffeeItem = item;
      this.showPopupDetail = true;
      console.log('Selected Coffee Item:', this.selectedCoffeeItem);
    },
    closePopupDetail() {
      this.showPopupDetail = false;
      this.selectedCoffeeItem = null;
      // console.log('Close Popup Detail:', this.showPopupDetail);
    }
  },
};
</script>

<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 50; 
}

.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
}

.router-link-active {
    background-color: #3287e7; 
    color: white; 
  }
  
  .nav-link {
    transition: background-color 0.3s, color 0.3s;
  }
  
  .nav-link:hover {
    background-color: #3287e7; 
    color: white; 
  }
</style>