<template>
  <div id="app">
    <div class="headerbar">
      <div class="wrapper"><img src="./assets/uoa-logo.png" width="120" /></div>
    </div>

    <div class="main-content">
      <div class="lead-section">
        <div class="wrapper">
          <h1 class="lead-title mt-8">Banner Tool</h1>
          <p class="lead-text mt-4 mb-6">
            The banner tool allows you to create custom banners that can be added to your LMS subjects.
          </p>
        </div>
      </div>
      <div class="banner-section">
        <div class="wrapper">
          <header v-if="bannerType === 'shield-right'" id="shield-right" class="adx-shield right">
            <div class="image">
              <img :src="image.url" alt="" class="center-center" :style="{ 'margin-top': image.y + 'px', 'margin-left': image.x + 'px'}">
            </div>
            <div v-if="makeHistory" class="make-history">
              <img src="./assets/mh-stacked.jpg" alt="">
            </div>
            <div class="text">
              <h1>{{ title }}</h1>
              <h5 v-if="includeTagline">{{ tagline }}</h5>
            </div>
          </header>
          
          <header v-if="bannerType === 'shield-left'" id="shield-left" class="adx-shield left">
            <div class="image left">
              <img :src="image.url" alt="" class="center-center" :style="{ 'margin-top': image.y + 'px', 'margin-left': image.x + 'px'}">
            </div>
            <div v-if="makeHistory" class="make-history left">
              <img src="./assets/mh-stacked.jpg" alt="">
            </div>
            <div class="overlay"></div>
            <div class="text left">
              <h1>{{ title }}</h1>
              <h5 v-if="includeTagline">{{ tagline }}</h5>
            </div>
          </header>
          
          <header v-if="isBasic" id="basic" class="adx-shield basic">
            <div class="curve left"></div>
            <div class="text">
              <h1>{{ title }}</h1>
            </div>
            <div class="curve right"></div>
          </header>
        </div>
      </div>
    </div>

    <div class="control-section my-4">
      <div class="wrapper">
        <div class="grid grid-cols-12 gap-2">
          <div class="lg:col-span-6 col-span-12">
            <h3>Banner Type</h3>
            <div class="banner-type-buttons mb-2">
              <button
              v-for="(type, index) in bannerTypeOptions"
              v-bind:key="index"
              v-bind:class="{ 'bg-primary-dark ring-2 ring-primary-darker': bannerType === type.value }"
              v-on:click="bannerType = type.value"
              class="btn btn-primary mr-2 my-2">
              {{ type.name }}
              </button>
            </div>

            <h3>Image Options</h3>
            <div class="image-presets flex my-2">
              <button class="btn w-16 h-16" :class="presetImageClass('preset-computer')" :disabled="isBasic" @click="selectImage('preset-computer')">
                <img id="preset-computer" src="./assets/preset-images/computer.png" alt="">
              </button>
              <button class="btn w-16 h-16 ml-2" :class="presetImageClass('preset-grapes')" :disabled="isBasic" @click="selectImage('preset-grapes')">
                <img id="preset-grapes" src="./assets/preset-images/grapes.jpg" alt="">
              </button>
              <button class="btn w-16 h-16 ml-2" :class="presetImageClass('preset-lab')" :disabled="isBasic" @click="selectImage('preset-lab')">
                <img id="preset-lab" src="./assets/preset-images/lab.jpg" alt="">
              </button>
              <button class="btn w-16 h-16 ml-2" :class="presetImageClass('preset-library')" :disabled="isBasic" @click="selectImage('preset-library')">
                <img id="preset-library" src="./assets/preset-images/library.png" alt="">
              </button>
              <button class="btn w-16 h-16 ml-2" :class="presetImageClass('preset-braggs')" :disabled="isBasic" @click="selectImage('preset-braggs')">
                <img id="preset-braggs" src="./assets/preset-images/braggs.png" alt="">
              </button>
              <button class="btn w-16 h-16 ml-2" :class="presetImageClass('preset-iw')" :disabled="isBasic" @click="selectImage('preset-iw')">
                <img id="preset-iw" src="./assets/preset-images/iw.png" alt="">
              </button>
            </div>
            <input type="file" id="uploadImage" class="btn-primary mt-2 mb-4" accept="image/*" :disabled="isBasic" @change="openImage($event)">

            <div class="flex my-2">
              <h5 class="mr-2">Resize Image</h5>
              <input type="range" v-model="imageScale" min="1" max="2.5" step="0.05" class="w-2/5" :disabled="isBasic" @change="resizeImage()">
            </div>

            <div class="flex my-2">
              <h5 class="mr-2 my-auto">Move Image</h5>
              <button v-on:click="moveImage('up')" class="btn btn-primary mr-2" :disabled="isBasic">↑</button>
              <button v-on:click="moveImage('down')" class="btn btn-primary mr-2" :disabled="isBasic">↓</button>
              <button v-on:click="moveImage('left')" class="btn btn-primary mr-2" :disabled="isBasic">←</button>
              <button v-on:click="moveImage('right')" class="btn btn-primary mr-2" :disabled="isBasic">→</button>
            </div>

          </div>
          <div class="lg:col-span-6 col-span-12">
              <h3>Banner Title</h3>
            <div class="flex mb-4">
              <input type="text" v-model="title" class="w-5/6 border px-2 mr-2 my-2" placeholder="Banner Title" :maxlength="60">
              <span class="text-xs my-auto">{{ title.length + '/60'}}</span>
            </div>


            <div class="flex">
              <h3 class="mr-4">Tagline</h3>
              <input type="checkbox" class="mr-2 my-auto" v-model="includeTagline" :disabled="isBasic">
            </div>
            <div class="flex mb-4">
              <input type="text" v-model="tagline" class="w-5/6 border px-2 mr-2 my-2" placeholder="Tagline" :disabled="!includeTagline || isBasic" :maxlength="32">
              <span class="text-xs my-auto">{{ tagline.length + '/32'}}</span>
            </div>

            <div class="flex mb-4">
              <h3 class="mr-4">Inlude 'make history.' Icon</h3>
              <input type="checkbox" id="makeHistory" class="mr-2 my-auto" v-model="makeHistory" :disabled="isBasic">
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="download-section mt-4 py-8 text-center">
        <h3 class="text-center mb-4">Upon Completion</h3>
        <div>
          <button class="btn-secondary" @click="capture">Download Banner</button>
        </div>
    </div>

    <div class="footer">
      <div class="wrapper">
        <p>&copy; The University of Adelaide</p>
        <img src="./assets/uoa-logo.png" width="220" style="float: right" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import domtoimage from 'dom-to-image';

const imageSizeLimit = 5 * 1024 * 1024;

const bannerTypeOptions = [
  { name: 'Shield Right', value: 'shield-right' },
  { name: 'Shield Left', value: 'shield-left' },
  { name: 'Basic', value: 'basic' }
]

let bannerType = ref('shield-right');

let title = ref('Welcome to Cyber Security Fundamentals')
let tagline = ref("Here's a tagline")
let includeTagline = ref(true)

let image = ref({
  url: '',
  key: '',
  x: 0,
  y: 0
})

let makeHistory = ref(true)

let imageScale = ref(1)

const isBasic = computed(() => bannerType.value === 'basic')

watch(bannerType, (newVal, oldVal) => {
    const presets = document.querySelectorAll('.image-presets button')
  if (newVal === 'basic') {
    presets.forEach(preset => preset.style.filter = 'grayscale(1)')
  } else {
    presets.forEach(preset => preset.style.filter = 'grayscale(0)')
  }
})

onMounted(() => {
  selectImage('preset-computer')
})

function selectImage(key) {
  const selected = document.getElementById(key)
  if (selected) {
    image.value.url = selected.src
    image.value.key = key
  }
}

function presetImageClass(key) {
  return !isBasic.value && image.value.key === key ? 'ring-2 ring-primary-darker' : ''
}

function openImage(event) {
  const files = event.target.files;
  if (!files.length) {
    return
  }

  if (!files[0].type.match('image.*')) {
    alert('Please select an image file. eg. jpg, png')
    return
  }

  if (files[0].size > imageSizeLimit) {
    alert('Image size exceeded 5MB limit. Please select a smaller image.')
    return
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    image.value.url = e.target.result
  }
  reader.readAsDataURL(files[0])
  image.value.key = 'upload'
}

function resizeImage() {
  const image = document.querySelector(`#${bannerType.value} .image img`)
  image.style.transform = `scale(${imageScale.value})`
}

function moveImage(direction) {
  switch (direction) {
    case 'up':
      image.value.y -= 10
      break;
    case 'down':
      image.value.y += 10
      break;
    case 'left':
      image.value.x -= 10
      break;
    case 'right':
      image.value.x += 10
      break;
  }
}

function capture () {
  domtoimage.toPng(document.getElementById(bannerType.value), {
    height: isBasic ? 250 : 400,
    width: 1200,
    }).then(function (dataUrl) {
      var link = document.createElement('a')
        if (typeof link.download !== 'string') {
          window.open(dataUrl)
        } else {
          link.download = 'banner.png'
          link.href = dataUrl
          link.click()
        }
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
}
</script>
