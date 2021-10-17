<template>
  <div>
    <div v-if="errorFlag" style="color: #ff0000;">
      {{error}}
    </div>
    <router-link :to="{name: 'login'}">
      <button class="button" style="margin:5px; background-color: red; color: #30ff30; font-size: 16px;">Login</button>
    </router-link>
    <div>
      <el-input placeholder="search for title" v-model="search" size="medium"></el-input>
      <el-button type="primary" v-on:click="displayAllDetail(); getSortKey(); filterEvents()">Search</el-button>
    </div>
    <div>
      <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
      >
      </el-input>
      <div>
        <el-button class="button-new-tag" size="small" @click="showInput">+ add a category film tags</el-button>
        <el-button type="primary" v-on:click="filterEvents()">click here to filter by category films</el-button>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#create">Create Event</button>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#edit">Edit Event</button>
      </div>
    </div>
    <el-radio-group v-model="radio">
      <el-radio :label="1">number of attendees</el-radio>
      <el-radio :label="2">number of attendees</el-radio>
      <el-radio :label="3">date ASC</el-radio>
      <el-radio :label="4">date DESC</el-radio>
    </el-radio-group>
    <div>
      <el-table :data="getdata" style="width: 100%">
        <el-table-column prop="eventId" label="eventsId"></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="capacity" label="capacity"></el-table-column>
        <el-table-column prop="organizerFirstName" label="organizerFirstName"></el-table-column>
        <el-table-column prop="organizerLastName" label="organizerLastName"></el-table-column>
        <el-table-column prop="date" label="date"></el-table-column>
        <el-table-column prop="categories" label="categories"></el-table-column>
        <el-table-column prop="organizerId" label="organizerId"></el-table-column>
        <el-table-column prop="image_filename" label="image_filename">
          <template v-slot="scope">
            <img :src="scope.row.image_filename" width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column>
          <template v-slot="scope">
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" v-on:click="getDetails(scope.row)">see details</button>
          </template>
        </el-table-column>
        <el-table-column
            label="Operations">
          <template #default="scope">
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteEvent(scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="Operations">
          <template #default="scope">
            <el-button
                size="mini"
                type="warning"
                icon="el-icon-edit"
                class="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#edit"
                @click="getDetails(scope.row)">Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="events.length"
          :page-size="pageSize"
          @current-change="setPage">
      </el-pagination>
    </div>
  </div>
  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">event Details</h4>
          </div>
          <div class="modal-body">
            <el-table :data="details" style="width: 100%">
              <el-table-column prop="eventId" label="eventid"></el-table-column>
              <el-table-column prop="title" label="title"></el-table-column>
              <el-table-column prop="organizerFirstName" label="FirstName"></el-table-column>
              <el-table-column prop="organizerLastName" label="LastName"></el-table-column>
              <el-table-column prop="date" label="date"></el-table-column>
              <el-table-column prop="categories" label="categories"></el-table-column>
              <el-table-column prop="organizerId" label="orginizerId"></el-table-column>
              <el-table-column prop="image_filename" label="image">
                <template v-slot="scope">
                  <img :src="scope.row.image_filename" width="100" height="100">
                </template>
              </el-table-column>
              <el-table-column prop="description" label="description" width="600"></el-table-column>
              <el-table-column prop="url" label="url"></el-table-column>
              <el-table-column prop="fee" label="fee"></el-table-column>
              <el-table-column prop="venue" label="venue"></el-table-column>
              <el-table-column prop="isOnline" label="isOnline"></el-table-column>
              <el-table-column prop="requires_attendance_control" label="attentance"></el-table-column>
            </el-table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>
<!--  edit event begins-->
  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="edit" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit</h4>
          </div>
          <div class="modal-body">
            <el-form ref="form" label-width="120px" size="mini">
              <el-form-item label="Title">
                <el-input v-model="newEvent.titles" placeholder="enter a new tile" type="text"></el-input>
              </el-form-item>
              <el-form-item label="description">
                <el-input v-model="newEvent.description" placeholder="enter a new description" type="text"></el-input>
              </el-form-item>
              <el-form-item label="categories">
                <el-input v-model="newEvent.categories" placeholder="enter a new categories" type="email"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" v-on:click="editEvent(details)">Edit Event</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>
<!--  edit modal ends-->
<!--create modal-->
  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="create" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">event Details</h4>
          </div>
          <div class="modal-body">
            <el-form ref="form" :rules="rules" :model="newEvent" label-width="120px" size="mini">
              <el-form-item label="filename">
                <div>
                  <div
                      class="imagePreviewWrapper"
                      :style="{ 'background-image': `url(${previewImage})` }"
                      @click="selectImage">
                  </div>
                  <input
                      ref="fileInput"
                      type="file"
                      @input="pickFile">
                </div>
              </el-form-item>
              <el-form-item label="title">
                <el-input v-model="newEvent.titles" placeholder="enter a new title" type="text"></el-input>
              </el-form-item>
              <el-form-item label="capacity">
                <el-input v-model="newEvent.maxCapacity" placeholder="enter a capacity value" min="0" type="number"></el-input>
              </el-form-item>
              <el-form-item label="date">
                <input v-model="newEvent.date" type="datetime-local" placeholder="enter a new Date"/>
              </el-form-item>
              <el-form-item label="categories">
                <el-input v-model="newEvent.categorys" type="text" placeholder="enter an existing categories as a number. Eg; 1, 5"></el-input>
              </el-form-item>
              <el-form-item label="description">
                <el-input v-model="newEvent.description" type="text" placeholder="enter a new description"></el-input>
              </el-form-item>
              <el-form-item label="url">
                <el-input v-model="newEvent.url" type="url" placeholder="enter a URL"></el-input>
              </el-form-item>
              <el-form-item label="venue">
                <el-input v-model="newEvent.venue" type="text" placeholder="enter a new venue"></el-input>
              </el-form-item>
              <el-form-item label="fee">
                <el-input v-model="newEvent.fee" type="number" placeholder="enter a fees" min="0" step="0.01"></el-input>
              </el-form-item>
              <el-form-item label="isonline">
                <el-input v-model="newEvent.isOnline" type="number" placeholder="is the event onle or in person?" min="0" max="1"></el-input>
              </el-form-item>
              <el-form-item label="atendees control">
                <el-input v-model="newEvent.attentance" type="number" placeholder="attendance control"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" v-on:click="createEvent()">Create</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      value: [],
      eventMore: [],
      error: "",
      radio: 1,
      localToken: "",
      errorFlag: false,
      imageEvent: null,
      events: [],
      search: null,
      title: "",
      se: "",
      sortby: null,
      allEvents: [],
      page: 1,
      pageSize: 10,
      posts: [''],
      perPage: 9,
      pages: [],
      category: [],
      tags: [],
      click: null,
      previewImage: null,
      tagValue: '',
      details: [],
      filtering: [],
      newEvent: {
        titles: "",
        categorys: [],
        date: "",
        image: null,
        description: "",
        maxCapacity: "",
        url: "",
        venue: "",
        fee: null,
        isOnline: "",
        attentance: "",
        Id: "",
        organizerId: ""
      }
    }
  },
  mounted() {
    this.displayAllDetail();
  },
  computed: {
    getdata () {
      return this.events.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  methods: {
    getDetails(row) {
      this.details = [row];
    },
    setPage (val) {
      this.page = val
    },
    getCategory() {
      this.axios.get('http://localhost:4941/api/v1/events/categories')
          .then((response) => {
            this.category = response.data;
            for (let c = 0; c < this.events.length; c++) {
              let cate = [];
              for (let ca = 0; ca < this.events[c].categories.length; ca++) {
                for (let a = 0; a < this.category.length; a++) {
                  if (this.events[c].categories[ca] == this.category[a].id) {
                    cate.push(this.category[a].name);
                  }
                }
              }
              cate = cate.toString();
              this.events[c].categories = cate;
            }
          });
    },
    getSortKey () {
      if (this.radio == 1) {
        this.sortby = 'ATTENDEES_ASC';
      } else if (this.radio == 2) {
        this.sortby = 'ATTENDEES_DESC';
      } else if (this.radio == 3) {
        this.sortby = 'DATE_ASC';
      } else {
        this.sortby = 'DATE_DESC';
      }
    },
    searchEvents() {
      console.log(this.sortby)
        this.axios.get('http://localhost:4941/api/v1/events', { params: {q: this.search, sortBy: this.sortby}})
        .then((response) => {
          this.se = response.data;
          this.events = this.se;
          this.displayAllDetail();
          this.filterEvents();
        });

    },
    displayAllDetail() {
      var param = null;
      if (this.search == null) {
        param = {sortBy: this.sortby};
      } else {
        param = {q: this.search, sortBy: this.sortby};
      }
      this.axios.get('http://localhost:4941/api/v1/events', { params: param})
      .then((response) => {
        this.events = response.data;
        console.log(this.events);
        for (let i = 0; i < this.events.length; i++) {
          console.log(this.events[i]);
          this.axios.get('http://localhost:4941/api/v1/events/' + this.events[i].eventId)
          .then((response) => {
            let l = response.data;

            if (l.fee == 0.00) {
              l.fee = 'free';
            }
            this.events[i] = {
              "eventId": l.id,
              "title": l.title,
              "organizerFirstName": l.organizerFirstName,
              "organizerLastName": l.organizerLastName,
              "capacity": l.capacity,
              "url": l.url,
              "venue": l.venue,
              "fee": l.fee,
              "categories": this.events[i].categories,
              "date": l.date,
              "numAcceptedAttendees": this.events[i].numAcceptedAttendees,
              "description": l.description,
              "isOnline": l.isOnline,
              "requires_attendance_control": l.requires_attendance_control,
              "organizerId": l.organizerId,
              "image_filename": 'http://localhost:4941/api/v1/events/' + l.id + '/image'
            }

          });
        }
        this.getCategory();
        this.filterEvents();
        this.eventMore = this.events;
      });
    },
    filterEvents() {
      let tempo = [];
      let categori;
      console.log(this.events)
      for (let ev = 0; ev < this.events.length; ev++) {
        categori = this.events[ev].categories.split(',');
        for (let ca = 0; ca < categori.length; ca++) {
          if (this.dynamicTags.includes(categori[ca])) {
            tempo.push(this.events[ev]);
          }
        }
      }
      if (tempo.length != 0) {
        this.events = tempo;
      }

    },
    createEvent() {
      let b = this.newEvent.categorys.split(',').map(Number);
      let capa = Number(this.newEvent.maxCapacity);
      let addLeadingZeros;
      addLeadingZeros = function addLeadingZeros(n) {
        if (n <= 9) {
          return "0" + n;
        }
        return n;
      }
      let currentDatetime = new Date(this.newEvent.date);
      let formattedDate = currentDatetime.getFullYear() + "-" + addLeadingZeros(currentDatetime.getMonth() + 1) + "-" + addLeadingZeros(currentDatetime.getDate()) + " " + addLeadingZeros(currentDatetime.getHours()) + ":" + addLeadingZeros(currentDatetime.getMinutes()) + ":" + addLeadingZeros(currentDatetime.getSeconds());
      console.log(this.newEvent.date, formattedDate);
      this.axios.post('http://localhost:4941/api/v1/events', {
        "title": this.newEvent.titles,
        "description": this.newEvent.description,
        "venue": this.newEvent.venue,
        "date": formattedDate,
        "is_online": Number(this.newEvent.isOnline),
        "url": this.newEvent.url,
        "capacity": capa,
        "requires_attendance_control": Number(this.newEvent.attentance),
        "organizer_id": Number(localStorage.getItem("userId")),
        "categoryIds": b,
        "fee": parseFloat(this.newEvent.fee)
      }, {
        headers: {
          "X-Authorization": localStorage.getItem("auth_token")
        }
      }).then((response) => {
        console.log("hi");
        this.localToken = response.data.eventId;
        console.log(this.localToken);
        this.open("successfully created\n your new eventId is: " + this.localToken);
      this.axios.put('http://localhost:4941/api/v1/events/' + this.localToken + '/image', this.newEvent.image, {
        headers: {
          "X-Authorization": localStorage.getItem("auth_token"),
          "Content-Type": this.newEvent.image.type
        }
      }).then((response) => {
        console.log(response);
      });
      }).catch((e) => {
        this.open(e.response.statusText);
      });
    },
    deleteEvent(row) {
      console.log(row);
      this.axios.delete('http://localhost:4941/api/v1/events/' + row.eventId,  {
        headers: {
          "X-Authorization": localStorage.getItem("auth_token")
        }
      }).then((response) => {
        console.log(response.data);
        this.open("successfully deleted events: " + row.eventId);
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);
      });
    },
    editEvent(row) {
      console.log(this.details);
      this.axios.patch('http://localhost:4941/api/v1/events/' + this.details.eventId,  {
        "title": row.titles,
        "description": row.description,
        "categoryIds": row.categorys
      },{
        headers: {
          "X-Authorization": localStorage.getItem("auth_token")
        }
      }).then((response) => {
        console.log(response.data);
        this.open("successfully deleted events: " + row.eventId);
      }).catch((e) => {
        this.open(e.response.status + " " + e.response.statusText);
      });
    },
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
        this.newEvent.image = file[0];
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    open(errorMessage) {
      this.$msgbox({
        title: 'Message',
        message: h('p', [
          h('span', errorMessage)
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',

      });
    },
    similarEvent() {
      let d = this.events;
      for (let similar = 0; similar < d.length; similar++) {
        console.log(d[similar].categories);
      }
    }
  }

}
</script>
<style scoped>
table, th, td {
  border: 1px solid black;
  display: table-cell;
  vertical-align: inherit;
  font-weight: bold;
  text-align: center;
}
.form{
  width: 10%;
  padding: 10px;
  outline: none;
  border: 2px solid dodgerblue;
}
.button{
  color: red;
  padding: 15px;
  cursor: pointer;
  width: 32%;
  opacity: 0.9;
}
.b{
  color: red;
  padding: 10px;
  cursor: pointer;
  width: 5%;
  opacity: 0.9;
}
/* Darker background on mouse-over */
.size {
  background-color:#44c767;
  border-radius:28px;
  border:1px solid #18ab29;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:17px;
  padding:16px 31px;
  text-decoration:none;
  text-shadow:0px 1px 0px #2f6627;
}
.size:hover {
  background-color:#5cbf2a;
}
.size:active {
  position:relative;
  top:1px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
