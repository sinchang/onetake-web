<template>
  <v-layout row wrap>
    <v-flex
      xs3
      v-for="(video, index) in videos"
      v-if="showAll ? showAll : index < 4"
      :key="video.video_key">
      <v-card>
        <video class="video" controls :src="video.video_url"></video>
        <v-card-title primary-title>
          <div style="width: 100%">
            <h4 class="mb-0 media-title">{{ video.text ? video.text : '作者很懒， 没标题' }}</h4>
            <p class="mt-2">{{ video.user_screen_name}}</p>
            <timeago :since="video.created_at"></timeago>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'card',
  props: {
    videos: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    showAll: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .video {
    width: 100%;
  }

  .media-title {
    min-height: 16px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
