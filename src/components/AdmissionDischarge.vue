<script>
import axios from 'axios';

export default {
  data() {
    return {
      admission: {
        datetime_of_discharge: ''
      }
    };
  },
  methods: {
    dischargeAdmission() {
      axios.put(`http://localhost:8000/api/admissions/${this.$route.params.id}`, this.admission)
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
