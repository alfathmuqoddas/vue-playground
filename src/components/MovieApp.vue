<script setup lang="ts">
import { ref, watch } from "vue";
import { store } from "../store/main.ts";

interface TMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
}
const movies = ref<TMovies[]>([]);
const search = ref<string>("");
const loading = ref<boolean>(false);

const fetchMovies = async (query: string) => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=af1284eb&`
    );
    const { Search } = await response.json();
    movies.value = Search;
  } catch (err) {
    console.error("Error: ", err);
  } finally {
    loading.value = false;
  }
};

//onMounted(() => {
//  fetchMovies();
//});

let debounceTimeout: any;
const debouncefetchMovies = (id: string) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchMovies(id);
  }, 500);
};

watch(search, (newSearch, oldSearch) => {
  if (newSearch !== oldSearch) {
    debouncefetchMovies(newSearch);
  }
});

const onError = (event: any) => {
  event.target.src = "https://placehold.co/60x89?text=Not Found";
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-1/2">
      <div class="flex items-center justify-center">
        <input
          v-model="search"
          class="p-4 w-11/12 rounded-l-2xl bg-slate-300 hover:bg-slate-200"
        />
        <button
          class="p-4 w-1/12 rounded-r-2xl text-white bg-blue-500 hover:bg-blue-600"
        >
          🔍
        </button>
      </div>
      <div class="max-h-[60vh] overflow-y-auto">
        <div class="px-6 bg-yellow-50 rounded-2xl mt-4">
          <div v-if="loading">loading...</div>
          <div v-else>
            <div v-if="movies">
              <div
                v-for="movie in movies"
                :key="movie.imdbID"
                class="py-6 [&:not(:last-child)]:border-b border-red-200"
              >
                <div class="flex gap-4">
                  <figure class="w-[60px] h-[89px]">
                    <img
                      width="60"
                      height="89"
                      :src="movie.Poster"
                      :alt="`${movie.Title} Poster`"
                      class="object-cover w-full h-full rounded-xl"
                      @error="onError"
                    />
                  </figure>
                  <div>
                    <h3 class="line-clamp-1">{{ movie.Title }}</h3>
                    <p>{{ movie.Year }}</p>
                    <div class="flex gap-2 items-center">
                      <div v-if="movie.Type === 'movie'">🎥</div>
                      <div v-else>📺</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>Error</div>
          </div>
        </div>
      </div>
      <button
        @click="store.count++"
        class="py-2 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-xl"
      >
        Inc
      </button>
      <button
        @click="store.count--"
        class="py-2 px-4 bg-neutral-100 hover:bg-neutral-200 rounded-xl"
      >
        Dec
      </button>
      <input v-model="store.query" class="border p-2 rounded-xl" />
    </div>
  </div>
</template>

<style scoped></style>
