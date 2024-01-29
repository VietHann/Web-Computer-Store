<template>
  <NavbarUser />
  <br /><br /><br /><br />
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1
          class="mt-4 nav__logo"
          style="text-decoration: none; font-family: var(--body-font)"
        >
          About Us
        </h1>
        <p>Chào mừng bạn đến với cửa hàng bán thiết bị máy tính của tôi!</p>
        <p>
          Chúng tôi tự hào là một trong những địa chỉ hàng đầu về thiết bị máy
          tính và công nghệ tại Hà Nội. Với hơn 10 năm kinh nghiệm trong ngành,
          chúng tôi cam kết mang đến cho khách hàng của mình những sản phẩm và
          dịch vụ tốt nhất.
        </p>
        <h2
          class="nav__logo"
          style="text-decoration: none; font-family: var(--body-font)"
        >
          Why choose us?
        </h2>
        <p>
          <span class="kytu"> ✔ </span>Đa dạng sản phẩm: Chúng tôi cung cấp một
          loạt các sản phẩm đa dạng từ các nhà sản xuất hàng đầu trên thị
          trường. <br /><span class="kytu"> ✔ </span>Chất lượng: Chất lượng sản
          phẩm luôn được đặt lên hàng đầu. Chúng tôi chọn lọc những sản phẩm tốt
          nhất để đảm bảo sự hài lòng của khách hàng. <br /><span class="kytu">
            ✔ </span
          >Dịch vụ khách hàng: Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn
          sàng để giải đáp mọi thắc mắc và hỗ trợ bạn trong quá trình mua sắm và
          sử dụng sản phẩm. <br /><span class="kytu"> ✔ </span> Giá cả cạnh
          tranh: Chúng tôi cam kết cung cấp giá cả cạnh tranh và các ưu đãi đặc
          biệt cho khách hàng thường xuyên.
        </p>
      </div>
      <br /><br /><br />
      <div class="col-md-6">
        <div class="accordion" id="accordionExample">
          <div
            v-for="(item, index) in accordionItems"
            :key="index"
            class="card border border-neutral-200 mb-2 custom-card"
          >
            <div class="card-header p-0 custom-header">
              <h2 class="mb-0">
                <button
                  class="btn btn-link btn-block text-left custom-button"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse' + index"
                  :aria-expanded="openedIndex === index"
                  @click="toggleAccordion(index)"
                >
                  {{ item.summary }}
                </button>
              </h2>
            </div>
            <div
              :id="'collapse' + index"
              class="collapse custom-collapse"
              :class="{ show: openedIndex === index }"
              data-parent="#accordionExample"
            >
              <div class="card-body p-4">
                {{ item.details }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavbarUser from "@/components/Header/NavbarUser.vue";

export default {
  data() {
    return {
      openedIndex: -1,
      accordionItems: [
        {
          summary: "Địa chỉ của chúng tôi?",
          details: "Hà Nội, Việt Nam",
        },
        {
          summary: "Bạn muốn hỗ trợ?",
          details:
            "Bạn có thể liên hệ với chúng tôi qua số điện thoại: 033.333.333 hoặc email: lv.viet.vn@gmail.com.",
        },
        {
          summary: "Liên hệ đặt hàng?",
          details:
            "Hiện tại chưa có cách nào để đặt hàng, bạn có thể liên hệ với chúng tôi để biết thêm thông tin đặt hàng.",
        },
      ],
    };
  },
  methods: {
    toggleAccordion(index) {
      this.openedIndex = this.openedIndex === index ? -1 : index;
    },
  },
  components: {
    NavbarUser,
  },
};
</script>

<style scoped>
.custom-card {
  background-color: #f8f9fa;
  border: none;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 10px;
}

.custom-header {
  padding: 0;
  background-color: transparent;
}

.custom-button {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.custom-button:focus {
  outline: none;
}

.custom-collapse {
  background-color: #ebebeb;
  border: none;
}
.container {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 15px;
}
.kytu {
  color: rgb(2, 124, 35);
}
</style>
