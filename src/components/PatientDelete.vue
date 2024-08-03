<script>
import axios from 'axios';

export default {
  methods: {
    deletePatient() {
      axios.delete(`http://localhost:8000/api/patients/${this.$route.params.id}`)
        .then(() => {
          // Handle success, e.g., redirect or update the UI
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
