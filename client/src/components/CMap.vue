<template>
  <div>
    <GmapMap
      v-bind:center="{lat:10, lng:10}"
      v-bind:zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-bind:key="index"
        v-for="(m, index) in markers"
        v-bind:position="m.position"
        v-bind:clickable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      markers: [
        {
          position: { lat: 10.0, lng: 10.0 }
        },
        {
          position: { lat: 11.0, lng: 11.0 }
        }
      ]
    };
  }
  
};
</script>