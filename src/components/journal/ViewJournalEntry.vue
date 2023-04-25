<!--displays just one journal entry-->
<template>
    <div class="flex flex-col items-center text-center">
      <h2 class="text-xl my-5 ">Note</h2>
      <div class="p-6">
      <div class="md:max-w-lg mx-auto">
    <div v-if="(!!entry)">
      <NoteCard :key="entry._id" :entry="entry" />
    </div>
    
    
  <div v-else>
    <h3 >An error has occurred</h3>
  </div>
</div>
</div>


  <!--let user go back to home page-->
    <default-button link :to="'/notes'" text="Go Back" buttonType="secondary" class="mt-3" />

  </div>
</template>

<script>
import api from '../../services/api';
import NoteCard from './JournalCard.vue';
const { DateTime } = require("luxon");

export default {
  components: {
    NoteCard
  },
  data() {
    return {
      entryId: this.$route.params._id,
      errorOccurred: null,
      entry: [],
      userID : this.$store.state.userId,
      userToken: this.$store.state.token
    }
  },
  //when component is loaded, call loadEntry
  mounted() {
    this.loadEntry();
  },
  methods: {
    //called upon the form load
    async loadEntry() {
      await api().get(`/note/byEntryId/${this.userID}/${this.entryId}`, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then(response => {
          this.entry = response.data;
          this.entry.entryDate = DateTime.fromISO(
            this.entry.entryDate
          ).toLocaleString(DateTime.DATE_FULL);

        }).catch(error => {
          this.errorOccurred = error.message;
          console.log('error has occurred: ' + this.errorOccurred)
        });
    }
  }
}
</script>
