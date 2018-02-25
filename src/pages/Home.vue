<template>
  <div>
    <h2>VLOG 大放送</h2>
    <card :videos="vlogs" :show-all="false" />
    <p class="text-md-right more" @click="redirect(1)">全部 >></p>
    <h2>素人の日常</h2>
    <card :videos="videos" :show-all="false" />
    <p class="text-md-right more" @click="redirect(11)">全部 >></p>
    <v-tabs
      fixed-tabs
      @input="tabUpdated">
      <v-tab v-for="(type, index) in types" :key="index">
        {{ type.name }}
      </v-tab>
    </v-tabs>
    <v-layout row wrap>
        <v-flex xs12 sm4 offset-sm4>
          <v-card
            v-for="(media, index) in medias"
            :style="{ 'margin-bottom': '20px'}"
            :key="index">
            <v-card-media
              v-if="media.item.vtype === 1"
              width="100%"
              height="315px"
              :src="media.item.preview_url"
              >
            </v-card-media>
            <v-card-media
              height="315px"
              v-else>
              <video class="video" controls :src="media.item.video_url"></video>
            </v-card-media>
            <v-card-title primary-title>
              <div style="width: 100%">
                <h4 class="mb-0 media-title">{{ media.item.text }}</h4>
                <p class="mt-2">{{ media.item.user_screen_name}}</p>
                <timeago :since="media.item.created_at"></timeago>  {{media.acc_addr_chs}}
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
    </v-layout>
    <div class="text-md-center">
      <v-btn @click="load" :loading="loading">Loading More</v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
import {
  getVideos,
  getMedias
} from '../api/index'

export default {
  name: 'Home',
  components: {
    Card
  },
  data() {
    return {
      videos: [],
      vlogs: [],
      types: [{
        value: '',
        name: '全部'
      }, {
        value: 'photo',
        name: '照片'
      }, {
        value: 'gif',
        name: '动图'
      }, {
        value: 'video',
        name: '视频'
      }],
      medias: [],
      loading: false,
      type: ''
    }
  },
  created() {
    getVideos(1).then(res => {
      this.vlogs = res.data.photos
    })

     getVideos(11).then(res => {
      this.videos = res.data.photos
    })

    getMedias().then(res => {
      this.medias = res.data
    })
  },
  methods: {
    redirect(id) {
      this.$router.push({ path: 'video', query: { id } })
    },
    tabUpdated(i) {
      this.type = this.types[i].value

      getMedias(type).then(res => {
        this.medias = res.data
      })
    },
    load() {
      this.loading = true

      const cursor = this.medias[this.medias.length - 1].published_at

      getMedias(this.type, cursor)
        .then(res => {
          this.medias = [...this.medias, ...res.data]
          this.loading = false
        })
        .catch(() => (this.loading = false))
    }
  }
}
</script>

<style>
  .more {
    margin-top: 10px;
    cursor: pointer;
  }

  .video {
    width: 100%;
  }

</style>

