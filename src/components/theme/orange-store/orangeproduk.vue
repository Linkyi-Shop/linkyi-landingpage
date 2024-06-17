<template>
  <div class="bg-slate-100">
    <div class="mx-auto min-h-full max-w-md">
      <div class="min-h-screen bg-white pb-16">
        <!-- navbar orange -->
        <div class="bg-pink-100 mx-0 my-0 py-4 sticky top-0 z-50">
          <!-- navbar search -->
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
        <!-- end navbar orange -->

        <!-- content section -->
        <div class="bg-pink-100 p-6 mt-0">
          <div class="flex items-center mb-4">
            <img src="../../../assets/cake.svg" alt="Logo" class="h-20 w-30 mr-4" />
            <div>
              <h2 class="text-xl font-bold text-left">Cake Shop</h2>
              <p class="text-sm text-justify text-gray-500">
                Temani harimu dengan cake-cake yang manis dan lembut dari Cake Shop. Setiap gigitan cake akan membuatmu bahagia seperti baru mendapatkan gaji dari bos.
              </p>
            </div>
          </div>
        </div>
        <!-- end content section -->

        <!-- categori section -->
        <div class="grid justify-items-stretch mt-4">
          <ul class="flex space-x-2 px-3 py-2">
            <li
              v-for="category in categories"
              :key="category"
              :class="{ 'bg-pink-200 text-pink-900': selectedCategory === category, 'bg-white text-slate-600': selectedCategory !== category }"
              class="py-1 px-3 rounded-lg shadow cursor-pointer"
              @click="selectCategory(category)"
            >
              {{ category }}
            </li>
            <li class="relative py-1 px-3 bg-white text-slate-600 rounded-lg shadow cursor-pointer" @click="toggleDropdown">
              ▼
              <ul v-if="isDropdownVisible" class="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-lg w-max dropdown-menu">
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Cheesecake')">Cheesecake</li>
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Chocomaltine')">Chocomaltine</li>
                <li class="py-1 px-3 hover:bg-slate-100 cursor-pointer" @click="selectCategory('Redvelvet')">Redvelvet</li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Cake Menu -->
        <div class="grid grid-cols-2 gap-4 p-4">
          <div
            class="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
            v-for="item in filteredCakeItems"
            :key="item.name"
            @click="showPopup(item)"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-32 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-bold">{{ item.name }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <p class="text-gray-800 mt-2">{{ item.price }}</p>
            </div>
          </div>
        </div>

        <!-- CakeDetailPopup -->
        <CakeDetailPopup
          v-if="showPopupDetail"
          :cakeItem="selectedCakeItem"
          @close="closePopupDetail"
        />
        <!-- end cake menu -->

        <!-- Navbar button -->
        <div class="fixed bottom-0 left-0 right-0 mx-auto max-w-md z-50 bg-pink-300">
          <div class="flex justify-center py-2">
            <ul class="flex space-x-20 font-semibold">
              <router-link to="/orangeproduk" exact class="nav-link py-2 px-8 bg-white text-pink-900 rounded-md shadow text-semibold">Produk</router-link>
              <router-link to="/orangeakun" exact class="nav-link py-2 px-8 bg-white text-pink-900 rounded-md shadow text-semibold">Linkyi</router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CakeDetailPopup from './CakeDetailPopup.vue';
import cheesecake from '../../../assets/cheesecake.svg';
import chocomaltine from '../../../assets/chocomaltine.svg';
import redvelvet from '../../../assets/redvelvet.svg';
import matcha from '../../../assets/matcha.svg';
import mixberry from '../../../assets/mixberry.svg';
import deville from '../../../assets/deville.svg';

export default {
  components: {
    CakeDetailPopup,
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'All Cake',
      isDropdownVisible: false,
      showPopupDetail: false,
      selectedCakeItem: null,
      categories: ['All Cake', 'De Ville', 'Matcha', 'Mix Berry'],
      cakeItems: [
        {
          name: 'Cheesecake',
          description: 'Cheesecake yang lembut dan manis',
          price: 'Rp 50.000',
          image: cheesecake,
          category: 'Cheesecake',
        },
        {
          name: 'Chocomaltine',
          description: 'Chocomaltine yang manis dan gurih',
          price: 'Rp 60.000',
          image: chocomaltine,
          category: 'Chocomaltine',
        },
        {
          name: 'Redvelvet',
          description: 'Redvelvet yang manis dan lembut',
          price: 'Rp 70.000',
          image: redvelvet,
          category: 'Redvelvet',
        },
        {
          name: 'Matcha',
          description: 'Matcha yang manis dan lembut',
          price: 'Rp 70.000',
          image: matcha,
          category: 'Matcha',
        },
        {
          name: 'Mix Berry',
          description: 'Mix Berry yang manis dan lembut',
          price: 'Rp 80.000',
          image: mixberry,
          category: 'Mix Berry',
        },
        {
          name: 'De Ville',
          description: 'De Ville yang manis dan lembut',
          price: 'Rp 90.000',
          image: deville,
          category: 'De Ville',
        }
      ],
    };
  },
  computed: {
    filteredCakeItems() {
      return this.cakeItems.filter(item => {
        const matchesCategory = this.selectedCategory === 'All Cake' || item.category === this.selectedCategory;
        const matchesSearchQuery = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
      });
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.isDropdownVisible = false;
    },
    filterItems() {
      // Empty method to force input binding updates
    },
    showPopup(item) {
      this.selectedCakeItem = item;
      this.showPopupDetail = true;
    },
    closePopupDetail() {
      this.showPopupDetail = false;
      this.selectedCakeItem = null;
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
  background-color: #f55ff5; 
  color: white; 
}

.nav-link {
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #f55ff5; 
  color: white; 
}
</style>
