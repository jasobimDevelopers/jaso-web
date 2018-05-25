<template>
  <div class="home-page">
    <section class="header-wrapper">
      <header class="section-wrapper flex-sb">
        <router-link to="/" class="logo-wrapper flex-row">
          <img src="@/assets/images/logo.png" />
          <div class="company-name">嘉实智慧安装</div>
        </router-link>
        <router-link to="/login">
          <el-button type="primary" class="login-btn">{{$t('login.logIn')}}</el-button>
        </router-link>
      </header>

      <div class="section-wrapper content flex-sb-start">
        <section>
          <div class="desc">
            <section>各个终端联合，</section>
            <section>将BIM落地到建筑施工管理中</section>
          </div>
          <div class="sub-desc">
            <section>BIM引领建筑未来，致力打造</section>
            <section>最具落地的建筑信息化管理平台</section>
          </div>
        </section>
        <section>
          <laboratory></laboratory>
        </section>
      </div>
    </section>

    <div class="bg-wrapper">
      <section class="section-wrapper data-info flex-sb">
        <svg-icon icon-class="电脑" size="438" class="big-icon"></svg-icon>

        <div class="info-wrapper">
          <header class="title">
            用数据了解你的项目
          </header>
          <div class="line"></div>
          <div class="content">
            数据时代，一切才刚刚开始。你需要了解整个项目建设过程中
            每一个环节、每一个节点的数据，通过信息化的管理平台，可
            将所有纸质内容转化成在线数据，永久保存，通过完成整个项
            目的建设，汇总出完整的资料与数据，为后期项目总结，为未
            来新开工项目做准备都提供了非常有利的数据支撑！
          </div>
        </div>
      </section>
    </div>

    <div class="bg-wrapper">
      <section class="section-wrapper manage-info flex-column-center">
        <div class="info-wrapper flex-column-center">
          <header class="title">
            <div>众多功能板块</div>
            <div>BIM模型管理、质量管理、生产管理、资料管理等</div>
          </header>
          <div class="line"></div>
          <div class="content">
            功能全面，覆盖整个项目施工管理全过程，包括BIM模型管理、生产管理、成本管理、统计管理、物资管理、质量管理、安全管理、资料管理等等众多板块
          </div>
        </div>

        <svg-icon icon-class="插图" size="386" class="big-icon"></svg-icon>

        <div class="flex-sb" style="width: 100%">
          <card iconClass="用户画像" iconSize="60" title="用户管理" content="可管理项目下的所有人员，对他们进行权限等设置。"></card>
          <card iconClass="营销" iconSize="60" title="生产管理" content="板块下包含施工日志、任务单、预付单等多个功能。"></card>
          <card iconClass="运营" iconSize="60" title="资料管理" content="通过平台存储图纸、文档、图片等各类文件，永久保存。"></card>
          <card iconClass="优化" iconSize="60" title="统计管理" content="通过统计管理版块，清楚的了解到项目目前的各项数据。"></card>
        </div>
      </section>
    </div>

    <div class="bg-wrapper">
      <section class="section-wrapper file-info flex-sb">
        <div class="info-wrapper">
          <header class="title">
            <div>工程资料全过程存储</div>
            <div>不用担心纸质文件丢失和电脑故障</div>
          </header>
          <div class="line"></div>
          <div class="content">
            将项目施工过程中生成的所有资料上传于平台，通过信息化的模式永久存储于服务器，不用担心纸质文件的损坏，不再担心本地电脑故障导致文件无法取出。
          </div>
          <svg-icon icon-class="文件上传" :width="427" :height="130" class="big-icon"></svg-icon>
        </div>

        <div class="cards">
          <card direction="line" :contentStyle="contentStyle" iconClass="上传icon" iconSize="60" title="文件上传" content="文件可一键上传单个或多个文件，支持文件夹上传。"></card>
          <card direction="line" :contentStyle="contentStyle" iconClass="整理icon" iconSize="60" title="文件整理" content="支上传至平台的文件，还可以通过复制，移动，删除等功能进行整理"></card>
          <card direction="line" :contentStyle="contentStyle" iconClass="下载icon" iconSize="60" title="文件下载" content="将储存于平台的文件，随时进行打包下载，方便提取。"></card>
        </div>
      </section>
    </div>

    <div class="bg-wrapper">
      <section class="section-wrapper api-info flex-column-center">
        <div class="info-wrapper flex-column-center">
          <header class="title">
            <div>将移动端和PC端联合</div>
            <div>打造无界管理，无论在哪都可以进行项目管理</div>
          </header>
          <div class="line"></div>
          <div class="flex-sb" style="width: 100%">
            <div class="content">
              手机端和电脑端的功能相辅相成，手机端更加侧重日常施工管理，可通过手机进行审批类，资料类的提交与管理，提高日常项目管理效率。
            </div>
            <svg-icon icon-class="手机端管理" :width="559" :height="258" class="big-icon"></svg-icon>
          </div>
        </div>

        <div class="flex-sb" style="width: 100%">
          <card direction="line" iconClass="质量-index" iconSize="72" title="质量管理" content="手机端可以处理项目管理中提交质量、安全类问题，及时进行处理和反馈。"></card>
          <card direction="line" iconClass="BIM-index" iconSize="72" title="BIM模型管理" content="手机端查看BIM模型，对现场施工提供了技术支持，将模型从办公室电脑搬到项目施工现场。"></card>
          <card direction="line" iconClass="考勤" iconSize="72" title="考勤管理" content="手机端集成了考勤管理，方便项目人员通过手机考勤，及时记录考勤情况，进行汇总分析。"></card>
        </div>
      </section>
    </div>

    <div class="bg-wrapper">
      <section class="section-wrapper safe-info flex-column-center">
        <div class="info-wrapper">
          <div class="content">
            加密服务基于国家密码局认证的硬件加密机，提供了云上数据加解密解决方案，用户能够对密钥进行安全可靠的管理，也能使用多种加密算法来对云上业务的数据进行可靠的加解密运算。
          </div>
        </div>

        <svg-icon icon-class="安全" :width="392" :height="342" class="big-icon"></svg-icon>
      </section>
    </div>

    <footer>
      <div class="desc-info">
        <div class="section-wrapper">
          <div class="title">多项目同时管理，一切尽在掌握</div>
          <div class="content">一个平台可同时管理多个项目，所有项目动态都可掌握，成为真正意义上的“线上指挥所”。</div>

          <svg-icon icon-class="波浪" :width="1200" :height="240" class="mountain big-icon"></svg-icon>

          <svg-icon icon-class="MacBookPro_dA" :width="694" :height="408" class="laptop big-icon"></svg-icon>
        </div>
      </div>

      <div class="contact-info">
        <div style="font-size: 24px; line-height: 33px">嘉实智慧安装平台</div>
        <div>Tel：021-69589519</div>
        <div>E-mail：jasobim</div>
        <div>京ICP备15055677号</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Laboratory from './components/Laboratory';
import Card from './components/Card';

export default {
  name: 'Home',
  components: {
    Laboratory,
    Card,
  },
  data() {
    return {
      contentStyle: {
        marginLeft: '54px',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .home-page {
    .section-wrapper {
      position: relative;
      margin: 0 auto;
      width: 1200px;
    }

    .header-wrapper {
      padding-top: 20px;
      height: 696px;
      color: #ffffff;
      background-image: linear-gradient(90deg, #5AABFF 0%, #1EDEC4 100%);

      .logo-wrapper img {
        height: 40px;
      }

      .company-name {
        margin-left: 12px;
        font-size: 24px;
      }

      .login-btn {
        width: 106px;
        background: rgba(255,255,255,0.30);
        border: 1px solid #FFFFFF;
        border-radius: 2px;

        &:hover {
          background: rgba(255,255,255,0.50);
        }
      }

      .content {
        margin-top: 118px;
        padding-left: 28px;

        .desc {
          margin-top: 48px;
          font-size: 32px;
          line-height: 45px;
        }

        .sub-desc {
          margin-top: 8px;
          font-size: 22px;
          line-height: 30px;
        }
      }
    }

    .bg-wrapper:nth-child(even) {
      background: #ffffff;
    }

    .bg-wrapper:nth-child(odd) {
      background: #F9FBFC;
    }

    .info-wrapper {
      .title {
        font-size: 32px;
        color: #303133;
        line-height: 45px;
      }

      .line {
        margin: 27px 0 25px;
        width: 85px;
        height: 3px;
        background: #409EFF;
        border-radius: 2px;
      }

      .content {
        font-size: 18px;
        color: #909399;
        line-height: 28px;
      }
    }

    .data-info {
      padding-top: 72px;
      padding-bottom: 90px;

      .info-wrapper {
        width: 486px;
      }
    }

    .manage-info {
      padding-top: 132px;
      padding-bottom: 138px;

      .info-wrapper {
        width: 775px;
        text-align: center;
      }

      .card {
        width: 280px;
        height: 220px;
      }
    }

    .file-info {
      padding-top: 89px;
      padding-bottom: 168px;

      .info-wrapper {
        width: 648px;

        .line {
          background: #57DB9B;
        }

        .content {
          margin-bottom: 36px;
        }
      }

      .card {
        width: 430px;
        height: 150px;
        margin-bottom: 16px;
      }
    }

    .api-info {
      padding-top: 132px;
      padding-bottom: 132px;

      .info-wrapper {
        text-align: center;

        .content {
          margin-right: 48px;
        }
      }

      .card {
        width: 390px;
        height: 150px;
      }
    }

    .safe-info {
      padding-top: 114px;
      padding-bottom: 78px;

      .info-wrapper {
        margin-bottom: 36px;
      }
    }

    footer {
      .desc-info {
        padding-top: 130px;
        height: 358px;
        color: #ffffff;
        background-image: linear-gradient(-90deg, #02E592 0%, #00B078 100%);

        .section-wrapper {
          height: 100%;
        }

        .title {
          font-size: 24px;
          line-height: 33px;
        }

        .content {
          margin-top: 12px;
          font-size: 14px;
          line-height: 20px;
        }

        .mountain {
          position: absolute;
          left: 0;
          bottom: 0;
        }

        .laptop {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .contact-info {
        padding-top: 55px;
        height: 182px;
        color: #A7A9AB;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        background: #2F3939;
      }
    }
  }

  @media (max-width: 1200px) {
    .home-page {
      .section-wrapper {
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;

        .flex-sb {
          flex-direction: column;
        }

        .info-wrapper {
          width: 100% !important;
        }

        .big-icon {
          display: none;
        }
      }

      .manage-info, .data-info, .file-info, .api-info {
        flex-direction: column;

        .card {
          width: 100%;
          margin-top: 16px;
        }
      }

      .header-wrapper {
        .laboratory {
          display: none;
        }
      }
    }
  }
</style>
