<template>
  <div class="container">
    <h1 class="text-center">Our Chat Group</h1>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="message in messages">
              <div class="received_msg">
                <div class="received_withd_msg">
                  <p><span class="sender_name">{{message.author}}:</span> {{message.message}}</p>
                  <span class="time_date">{{message.createdAt}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                @keyup.enter="saveMessage"
                v-model="message"
                type="text"
                class="write_msg"
                placeholder="Type a message and press Enter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from 'moment'

export default {
  name: "Chat",

  data() {
    return {
      message: null,
      messages: [],
      authUser: {}
    };
  },

  methods: {
    scrollToBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    },
    saveMessage() {
      //   save to firestore
      db.collection("chat")
        .add({
          message: this.message,
          author: this.authUser.displayName,
          createdAt: new Date()
        })
        .then(() => {
          this.scrollToBottom();
        });

      this.message = null;
    },

    fetchMessages() {
      db.collection("chat")
        .orderBy("createdAt")
        .onSnapshot(querySnapshot => {
          let allMessages = [];
          querySnapshot.forEach(doc => {
            allMessages.push(doc.data());
          });
          this.messages = allMessages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 1000);
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.fetchMessages();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  }
};
</script>

<style scoped="">
.container {
  max-width: 1080px;
  margin: auto;
}

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.received_msg {
  float: left;
  vertical-align: top;
  width: 100%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  text-align: left;
  color: #646464;
  font-size: 16px;
  margin: 0;
  padding: 5px 10px 0px 12px;
  width: 100%;
}
.time_date {
  text-align: left;
  color: hsl(0, 0%, 45%);
  display:block;
  width: 100%;
  padding-left:12px;
  margin-top: -4px;
  font-size: 10px;
}
.received_withd_msg {
  margin: 2px 0 ;
  width: 100%;
  background: #ebebeb;
}
.mesgs {
  float: left;
  padding: 10px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 14px;
  min-height: 48px;
  text-align: center;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}

.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 400px;
  overflow-y: auto;
}
.sender_name{
  color: rgba(26, 182, 117, 0.904);
  font-size: 16px;
  font-weight: 800;
}
</style>
