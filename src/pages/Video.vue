<template>
  <div>
    <h2>{{ title }}</h2>
    <card :videos="videos" />
    <div class="text-md-center">
      <v-btn @click="load" :loading="loading">Loading More</v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import {
  getVideos
} from '../api/index'

export default {
  name: 'Video',
  components: {
    Card
  },
  data() {
    return {
      videos: [],
      title: '',
      id: null,
      loading: false
    }
  },
  created() {
    this.id = this.$route.query.id

    this.title = this.id === 1 ? 'VLOG 大放送' : '素人の日常'

    getVideos(this.id).then(res => {
      this.videos = res.data.photos
    })
  },
  methods: {
    load() {
      this.loading = true

      const cursor = this.videos[this.videos.length - 1].published_at

      getVideos(this.id, cursor)
        .then(res => {
          this.videos = [...this.videos, ...res.data.photos]
          this.loading = false
        })
        .catch(() => this.loading = false)
    }
  }
}
</script>

