<template>
  <div class="body app-contacts page-aside-left">
    <div class="page bg-white">
      <div class="page-aside">
        <!-- Contacts Sidebar -->
        <div class="page-aside-switch">
          <i class="icon md-chevron-left" aria-hidden="true"></i>
          <i class="icon md-chevron-right" aria-hidden="true"></i>
        </div>
        <div class="page-aside-inner page-aside-scroll">
          <div data-role="container">
            <div data-role="content">
              <div class="page-aside-section">
                <div class="list-group">
                  <a
                    class="list-group-item justify-content-between"
                    href="javascript:void(0)"
                  >
                    <span>
                      <i class="icon md-inbox" aria-hidden="true"></i> Tất cả
                      danh sách
                    </span>
                    <span class="item-right">61</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Contacts Content -->
      <div class="page-main">
        <!-- Contacts Content Header -->
        <div class="page-header">
          <h1 class="page-title">Danh sách liên hệ</h1>
        </div>
        <!-- Contacts Content -->
        <div
          id="contactsContent"
          class="page-content page-content-table"
          data-plugin="selectable"
        >
          <div class="page-content-actions">
            <div class="btn-group btn-group-flat">
              <b-button variant="success">Tạo liên hệ</b-button>
            </div>
          </div>
          <!-- Contacts -->
          <b-table striped hover :items="items"></b-table>
          <ul
            data-plugin="paginator"
            data-total="50"
            data-skin="pagination-gap"
          ></ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "contactList",
  data() {
    return {
      items: []
    };
  },
  created() {
      let authToken = localStorage.getItem('auth_token');
      let config = {headers: {
          'X-STRINGEE-AUTH': authToken
        }
      }
      axios.get("https://test-portal.stringeex.com/v1/contact?limit=5&page=1&sort_by=created&sort_order=desc",config).then(response => this.items = response.data.data.rows);
  }
};
</script>
