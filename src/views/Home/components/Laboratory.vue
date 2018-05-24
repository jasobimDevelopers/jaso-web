<template>
  <div class="laboratory">
    <!-- <img class="component grid" src="//sensorsdata.cn/assets/img/laboratory/grid_017277d.png"> -->
    <div class="component machine">
      <img src="@/assets/images/machine.png">
      <div class="component box_machine">
        <em class="component layer"></em>
        <em class="component layer"></em>
      </div>
      <div class="component chart_machine">
        <div class="component lines">
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
          <em class="component line"></em>
        </div>
      </div>
    </div>
    <div class="component stars">
      <em class="component star"></em>
      <em class="component star"></em>
      <em class="component star"></em>
      <em class="component star"></em>
      <em class="component star"></em>
      <em class="component star"></em>
    </div>
    <div class="component machine_light1">
      <svg width="73px" height="43px" viewBox="0 0 73 43" xmlns="http://www.w3.org/2000/svg">
        <g stroke-width="1" stroke="#84FFBC" fill="#00E88C" fill-rule="evenodd" opacity="0.4">
          <ellipse cx="36" cy="21" rx="35.4596394" ry="20.4551318"></ellipse>
        </g>
      </svg>
    </div>
    <div class="component machine_light2">
      <svg width="73px" height="43px" viewBox="0 0 73 43" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#fff" stroke-width="1" fill="#fff" fill-rule="evenodd" opacity="0.3">
          <ellipse cx="36" cy="21" rx="35.4596394" ry="20.4551318"></ellipse>
        </g>
      </svg>
    </div>
    <div class="component machine_light">
      <svg width="72px" height="68px" viewBox="0 0 72 68" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="61.283797%" y1="21.5013672%" x2="61.283797%" y2="111.258097%" id="linearGradientMachineLight">
            <stop stop-color="#FFFFFF" stop-opacity="0" offset="0%"></stop>
            <stop stop-color="#FFFFFF" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g transform="translate(1, -18)" stroke-width="1" fill="url(#linearGradientMachineLight)" fill-rule="evenodd" opacity="0.8">
          <path d="M70.9015692,66.0503398 C70.6406566,70.9537769 67.3391681,75.81911 60.9662295,79.6260017 C47.3621794,87.7524169 24.9138185,87.9784511 10.8264122,80.1308631 C3.68771133,76.1541493 0.0658808118,70.867324 0,65.5618854 L0,-4.54747351e-13 L70.9015692,-4.54747351e-13 L70.9015692,66.0503398 Z"></path>
        </g>
      </svg>
    </div>
    <div class="component cord">
      <svg width="490px" height="239px" viewBox="0 0 490 239" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="pathLaptop" d="M32.1219533,13.6539503 L48.5500737,4.20271369 L48.5500737,4.20271369 C50.398883,3.13907808 52.6733746,3.13690822 54.5242099,4.19701439 L80.6400668,19.1554393 L80.6400668,19.1554393 C82.4705642,20.2038965 84.7171797,20.2140525 86.5570814,19.1821876 L119.57667,0.663940763"></path>
          <path id="pathPhone" d="M105.417009,218.5791 C89.7964849,227.803032,87.33725080,229.255212,84.2903746,229.286233 L81.8020835,227.884425 C2.95260334,183.463645,2.327776400,183.111642,1.80907665,182.598128 C1.45081302,181.976869,0.347214606,180.063138,1.00395668,177.617109 L2.9176875,176.513511 C171.348889,79.3836507,171.955051,79.0340926,172.458912,78.5316390 C172.810163,77.9264562,173.919108,76.0158183,173.269207,73.5679631 L171.358569,72.4590186 C96.3410782,28.9184634,95.7318128,28.5648425,95.2267412,28.0565912 C94.8769508,27.4451185,93.7800188,25.5275587,94.4452691,23.0838304 L96.3628289,21.9868984 L127.328752,4.27297312"></path>
          <path id="pathMac1" d="M135.013256,9 L116.050928,20.3056501 L116.050928,20.3056501 C114.627818,21.1541321 114.161989,22.9956219 115.010471,24.4187327 C115.275302,24.8629186 115.650458,25.2311029 116.099534,25.4875551 L212.200673,80.3677592"></path>
          <path id="pathMac2" d="M257.12507,106.022607 L449.679393,215.984056 L449.679393,215.984056 C452.738023,217.730739 456.490008,217.739513 459.556773,216.007153 L476.096041,206.664425 L476.096041,206.664425 C478.583556,205.259274 480.132938,202.634232 480.160971,199.777416 L480.994787,114.801673"></path>
          <radialGradient cx="127.619" cy="19.3241" r="50" gradientUnits="userSpaceOnUse" id="linearGradientCordStreamPhone">
            <animate attributeName="cx" values="113.89;65.13;0.03;180.62;111.67;153.64" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cy" values="190.91;216.67;179.16;70.78;29.36;2.95" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
            <stop stop-color="#67FECB" offset="0%"></stop>
            <stop stop-color="#67FECB" offset="25%"></stop>
            <stop stop-color="#009A7A" offset="100%"></stop>
          </radialGradient>
          <radialGradient cx="231" cy="92" r="60" gradientUnits="userSpaceOnUse" id="linearGradientCordStreamMac">
            <animate attributeName="cx" values="112;231;231;231;231;231;224;453;480;481" dur="2.5s" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cy" values="23;92;92;92;92;92;92;218;205;92" dur="2.5s" calcMode="linear" repeatCount="indefinite"></animate>
            <stop stop-color="#67FECB" offset="0%"></stop>
            <stop stop-color="#67FECB" offset="25%"></stop>
            <stop stop-color="#009A7A" offset="100%"></stop>
          </radialGradient>
          <radialGradient cx="120.514" cy="2.21603" r="30" gradientUnits="userSpaceOnUse" id="linearGradientCordStreamLaptop">
            <animate attributeName="cx" values="27.17;56.96;88.48;139.49" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="cy" values="23.68;5.95;20.83;-8.81" dur="2s" calcMode="linear" repeatCount="indefinite"></animate>
            <stop stop-color="#67FECB" offset="0%"></stop>
            <stop stop-color="#67FECB" offset="25%"></stop>
            <stop stop-color="#009A7A" offset="100%"></stop>
          </radialGradient>&gt;
          <linearGradient x1="100%" y1="50%" x2="46.1667201%" y2="50%" id="linearGradientDevier">
            <stop stop-color="#00B27A" offset="0%"></stop>
            <stop stop-color="#02E882" offset="100%"></stop>
          </linearGradient>
          <radialGradient cx="53.3394396%" cy="50%" fx="53.3394396%" fy="50%" r="55.3288719%" gradientTransform="translate(0.533394,0.500000),scale(0.458522,1.000000),rotate(90.000000),scale(1.000000,2.472451),translate(-0.533394,-0.500000)" id="radialGradientDriver">
            <stop stop-color="#00B27A" offset="0%"></stop>
            <stop stop-color="#00B27A" offset="39.7421078%"></stop>
            <stop stop-color="#47F89F" offset="100%"></stop>
          </radialGradient>
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="lines">
            <g stroke="#E1F2EE" opacity="0.15" stroke-width="4">
              <use class="line_laptop" xlink:href="#pathLaptop"></use>
              <use class="line_Phone" xlink:href="#pathPhone"></use>
              <use class="line_mac1" xlink:href="#pathMac1"></use>
            </g>
            <g stroke-linecap="round" stroke-linejoin="round">
              <use class="line_laptop" stroke="url(#linearGradientCordStreamLaptop)" stroke-width="2" xlink:href="#pathLaptop"></use>
              <use class="line_phone" stroke="url(#linearGradientCordStreamPhone)" stroke-width="2" xlink:href="#pathPhone"></use>
              <use class="line_mac1" stroke="url(#linearGradientCordStreamMac)" stroke-width="2" xlink:href="#pathMac1"></use>
            </g>
            <g transform="translate(207.000000, 37.000000)">
              <g transform="translate(0.000000, 39.326707)">
                <path d="M29,43.2199993 C45.0162577,43.2199993 58,37.2673211 58,29.9243204 C58,27.5375223 58,22.8960822 58,16 L0,16 C0,20.3875465 0,25.0289866 0,29.9243204 C0,37.2673211 12.9837423,43.2199993 29,43.2199993 Z" fill="#1A7C5C" style="mix-blend-mode: multiply;" opacity="0.4"></path>
                <path d="M29,40.2229694 C45.0162577,40.2229694 58,34.2696417 58,26.9258398 C58,24.5387812 58,19.8968347 58,13 L0,13 C0,17.3880252 0,22.0299718 0,26.9258398 C0,34.2696417 12.9837423,40.2229694 29,40.2229694 Z" fill="url(#linearGradientDevier)"></path>
                <ellipse fill="url(#radialGradientDriver)" cx="29" cy="13.2971296" rx="29" ry="13.2971296"></ellipse>
              </g>
              <g transform="translate(0.000000, 19.562662)">
                <path d="M29,40.7294728 C45.0162577,40.7294728 58,34.7761451 58,27.4323431 C58,25.0452846 58,20.403338 58,13.5065034 L0,13.5065034 C0,17.8945286 0,22.5364752 0,27.4323431 C0,34.7761451 12.9837423,40.7294728 29,40.7294728 Z" fill="url(#linearGradientDevier)"></path>
                <ellipse fill="url(#radialGradientDriver)" cx="29" cy="13.2971296" rx="29" ry="13.2971296"></ellipse>
              </g>
              <g>
                <path d="M29,40.7294728 C45.0162577,40.7294728 58,34.7761451 58,27.4323431 C58,25.0452846 58,20.403338 58,13.5065034 L0,13.5065034 C0,17.8945286 0,22.5364752 0,27.4323431 C0,34.7761451 12.9837423,40.7294728 29,40.7294728 Z" fill="url(#linearGradientDevier)"></path>
                <ellipse fill="#47F89F" cx="29" cy="13.2971296" rx="29" ry="13.2971296"></ellipse>
              </g>
              <g fill="#007E56" opacity="0.6">
                <path d="M50,71.0838677 C51.1045695,70.421128 52,68.8093548 52,67.4838714 C52,66.158388 51.1045695,65.621128 50,66.2838677 C48.8954305,66.9466074 48,68.5583807 48,69.8838641 C48,71.2093475 48.8954305,71.7466074 50,71.0838677 Z"></path>
                <path d="M50,52.0838677 C51.1045695,51.421128 52,49.8093548 52,48.4838714 C52,47.158388 51.1045695,46.621128 50,47.2838677 C48.8954305,47.9466074 48,49.5583807 48,50.8838641 C48,52.2093475 48.8954305,52.7466074 50,52.0838677 Z"></path>
                <path d="M50,31.0838677 C51.1045695,30.421128 52,28.8093548 52,27.4838714 C52,26.158388 51.1045695,25.621128 50,26.2838677 C48.8954305,26.9466074 48,28.5583807 48,29.8838641 C48,31.2093475 48.8954305,31.7466074 50,31.0838677 Z"></path>
              </g>
            </g>
            <g stroke="#E1F2EE" opacity="0.15" stroke-width="4">
              <use class="line_mac2" xlink:href="#pathMac2"></use>
            </g>
            <g stroke-linecap="round" stroke-linejoin="round">
              <use class="line_mac2" stroke="url(#linearGradientCordStreamMac)" stroke-width="2" xlink:href="#pathMac2"></use>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="component laptop">
      <img src="@/assets/images/laptop.png">
      <div class="component box_laptop">
        <div class="component layer">
          <div class="component page">
            <svg class="component picture" width="32px" height="43px" viewBox="0 0 53 71" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="42.6717441%" y1="13.8163232%" x2="42.671743%" y2="126.942774%" id="linearGradientPicture">
                  <stop stop-color="#D7D8D8" offset="0%"></stop>
                  <stop stop-color="#AEAFAF" stop-opacity="0" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect fill-opacity="0.3" fill="url(#linearGradientPicture)" x="0" y="0" width="53" height="71"></rect>
                <rect fill="#7FD1FB" x="3.3125" y="3.30232558" width="46.375" height="49.5348837"></rect>
                <path d="M12.1686816,9.75618742 C11.7542231,9.25190021 10.6112697,9.14043778 9.92541363,9.25190021 C8.32725933,9.51162548 6.625,10.9282837 6.625,13.1799092 C6.625,15.4315347 8.30544594,17.4533922 10.3647744,17.446525 L21.6746358,17.4091998 C23.3066089,17.4036802 24.6241311,15.8808564 24.6187999,14.0103062 C24.6135903,12.1378068 23.2873781,10.6254267 21.6554049,10.6309462 C21.305528,10.6319357 20.9723152,10.7032265 20.661046,10.831036 C20.5952911,8.31798538 18.4071668,6.60465116 16.1187731,6.60465116 C13.1405974,6.60465116 12.0980068,9.05295004 12.1686816,9.75618742 Z" fill="#DDF6FF" fill-rule="nonzero"></path>
                <path d="M36.9801347,22.0055651 C36.6919159,21.6548784 35.8970941,21.5773663 35.4201425,21.6548784 C34.3087691,21.8354941 33.125,22.8206532 33.125,24.3864574 C33.125,25.9522615 34.2935999,27.3582826 35.7256786,27.3535071 L43.5906757,27.3275507 C44.725567,27.3237124 45.6417859,26.2647246 45.6380785,24.9639242 C45.6344557,23.6617683 44.7121937,22.6100432 43.5773023,22.6138816 C43.3339943,22.6145697 43.1022746,22.6641461 42.8858147,22.7530261 C42.840088,21.0054242 41.3184432,19.8139535 39.7270701,19.8139535 C37.6560152,19.8139535 36.9309867,21.5165264 36.9801347,22.0055651 Z" fill="#DDF6FF" fill-rule="nonzero" transform="translate(39.381545, 23.583736) scale(-1, 1) translate(-39.381545, -23.583736) "></path>
                <polygon fill="#02E882" fill-rule="nonzero" points="3.3125 52.8372093 3.3125 33.0232558 16.5625 52.8372093"></polygon>
                <polygon fill="#02E882" fill-rule="nonzero" points="29.8125 36.5000262 41.0090274 52.8372093 49.6875 52.8087138 49.6508515 39.8587577 38.1766858 23.1162791"></polygon>
                <polygon fill="#47F89F" points="6.625 52.8372093 43.0625 52.8372093 21.9300553 23.1162791"></polygon>
              </g>
            </svg>
            <em class="component text"></em>
            <em class="component text"></em>
            <em class="component text"></em>
            <em class="component text"></em>
            <em class="component text"></em>
          </div>
          <div class="component user-box">
            <em class="component user"></em>
            <em class="component user"></em>
            <svg class="component user" width="60px" height="120px" viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="38.9532051%" y1="-56.6102876%" x2="38.9532059%" y2="156.070996%" id="linearGradientUser">
                  <stop stop-color="#FFFFFF" offset="0%"></stop>
                  <stop stop-color="#FFFFFF" stop-opacity="0.507274683" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g transform="translate(6, 26) scale(0.8)" stroke="none" stroke-width="1" fill="url(#linearGradientUser)" fill-rule="evenodd">
                <path d="M29.0266247,39.4781415 C17.9809297,39.4781415 9.02662468,30.6406585 9.02662468,19.7390707 C9.02662468,8.83748299 17.9809297,0 29.0266247,0 C40.0723197,0 49.0266247,8.83748299 49.0266247,19.7390707 C49.0266247,30.6406585 40.0723197,39.4781415 29.0266247,39.4781415 Z M14.6205,43.2112612 L45.3795,43.2112612 C53.4541792,43.2112612 60,49.757082 60,57.8317612 L60,70 L0,70 L0,57.8317612 L1.77635684e-15,57.8317612 C7.87493838e-16,49.757082 6.54582082,43.2112612 14.6205,43.2112612 L14.6205,43.2112612 Z"></path>
                <rect x="10" y="85" width="40" height="6"></rect>
                <rect x="10" y="95" width="40" height="6"></rect>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="component phone">
      <img src="@/assets/images/phone.png">
      <div class="component box_phone">
        <em class="component layer"></em>
      </div>
      <div class="component box_phone">
        <em class="component layer"></em>
      </div>
    </div>
    <div class="component mac">
      <img src="@/assets/images/mac.png">
      <div class="component box_mac">
        <div class="component layer">
          <svg class="component folder" width="65px" height="66px" viewBox="0 0 65 66" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradientFolder">
                <stop stop-color="rgba(215, 215, 215, 1)" offset="0%"></stop>
                <stop stop-color="#AEAEAE" stop-opacity="0" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g stroke="none" stroke-width="1" fill="url(#linearGradientFolder)" fill-rule="evenodd" opacity="0.3">
              <polygon points="4 4 29 4 32 16 65 16 65 62 4 62"></polygon>
            </g>
          </svg>
          <svg class="component folder" width="65px" height="66px" viewBox="0 0 65 66" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradientFolder1">
                <stop stop-color="#01F77A" offset="0%"></stop>
                <stop stop-color="#01F77A" stop-opacity="0.2" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g stroke="none" stroke-width="1" fill="url(#linearGradientFolder1)" fill-rule="evenodd" opacity="0.5">
              <polygon points="4 4 29 4 32 16 65 16 65 62 4 62"></polygon>
            </g>
          </svg>
          <svg class="component folder" width="65px" height="66px" viewBox="0 0 65 66" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradientFolder2">
                <stop stop-color="#01F77A" offset="0%"></stop>
                <stop stop-color="#01F77A" stop-opacity="0.45" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g stroke="none" stroke-width="1" fill="url(#linearGradientFolder2)" fill-rule="evenodd">
              <polygon points="4 4 29 4 32 16 65 16 65 62 4 62"></polygon>
            </g>
          </svg>
          <svg class="component chart-pie" width="46px" height="46px" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg">
            <g transform="scale(0.8) translate(6, 6)">
              <circle cx="23" cy="23" r="22" fill="#02E882" stroke="none" fill-rule="evenodd"></circle>
              <path transform="translate(23, 23)" fill="#00C084" d="M 0 0 v -22 A 22 22 1 0 1 22 -7.654042494670958e-15 z"></path>
            </g>
          </svg>
          <div class="component chart-progress">
            <em class="component progress-circle"></em>
            <em class="component progress-circle"></em>
            <em class="component progress-circle"></em>
            <div class="component progress-bar-box">
              <em class="component progress-bar"></em>
              <em class="component progress-bar"></em>
              <em class="component progress-bar"></em>
              <em class="component progress-bar"></em>
              <em class="component progress-bar"></em>
              <em class="component progress-bar"></em>
            </div>
          </div>
          <div class="component chart-bar">
            <em class="component bar"></em>
            <em class="component bar"></em>
            <em class="component bar"></em>
            <em class="component bar"></em>
            <em class="component bar"></em>
            <em class="component bar"></em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Laboratory',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @-webkit-keyframes fadeInDown {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes fadeInLeft {
    from {
        opacity: 0;
        -webkit-transform: translate3d(-100%,0,0);
        transform: translate3d(-100%,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        -webkit-transform: translate3d(-100%,0,0);
        transform: translate3d(-100%,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes fadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes fadeIn {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@-webkit-keyframes flash {
    from,50%,to {
        opacity: 1
    }

    25%,75% {
        opacity: 0
    }
}

@keyframes flash {
    from,50%,to {
        opacity: 1
    }

    25%,75% {
        opacity: 0
    }
}

@-webkit-keyframes floatDown {
    to,from {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    50% {
        opacity: .7;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@keyframes floatDown {
    to,from {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    50% {
        opacity: .7;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@-webkit-keyframes floatDown2 {
    50% {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    to,from {
        opacity: .7;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@keyframes floatDown2 {
    50% {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    to,from {
        opacity: .7;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@-webkit-keyframes floatRight {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(10px,5px,0);
        transform: translate3d(10px,5px,0)
    }
}

@keyframes floatRight {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(10px,5px,0);
        transform: translate3d(10px,5px,0)
    }
}

@-webkit-keyframes floatLeft {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(-20px,14px,0);
        transform: translate3d(-20px,14px,0)
    }
}

@keyframes floatLeft {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(-20px,14px,0);
        transform: translate3d(-20px,14px,0)
    }
}

@-webkit-keyframes floatRight2 {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(20px,5px,0);
        transform: translate3d(20px,5px,0)
    }
}

@keyframes floatRight2 {
    from {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(20px,5px,0);
        transform: translate3d(20px,5px,0)
    }
}

.laboratory {
    width: 686px;
    height: 541px;
    display: inline-block;
    position: relative;
    pointer-events: none
}

.laboratory .component {
    position: absolute;
    opacity: 0
}

.laboratory .grid {
    left: -279px;
    top: -54px;
    width: 1111px;
    height: 719px;
    opacity: 1
}

.laboratory .machine {
    top: 41px;
    left: 202px;
    -webkit-animation: fadeInDown .6s .5s forwards linear;
    animation: fadeInDown .6s .5s forwards linear
}

.laboratory .machine img {
    width: 182px;
    height: 208px
}

.laboratory .machine .box_machine {
    top: 97px;
    left: 87px;
    -webkit-transform: skewY(-30deg);
    transform: skewY(-30deg);
    -webkit-animation: fadeIn 1s 3.1s forwards linear;
    animation: fadeIn 1s 3.1s forwards linear
}

@-webkit-keyframes floatMachineLayer {
    to,from {
        opacity: .1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(14px,17px,0);
        transform: translate3d(14px,17px,0)
    }
}

@keyframes floatMachineLayer {
    to,from {
        opacity: .1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(14px,17px,0);
        transform: translate3d(14px,17px,0)
    }
}

@-webkit-keyframes floatMachineLayer2 {
    to,from {
        opacity: .1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(26px,30px,0);
        transform: translate3d(26px,30px,0)
    }
}

@keyframes floatMachineLayer2 {
    to,from {
        opacity: .1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(26px,30px,0);
        transform: translate3d(26px,30px,0)
    }
}

.laboratory .machine .box_machine .layer {
    height: 97px;
    width: 85.5px;
    background: #81ffbc;
    display: inline-block
}

.laboratory .machine .box_machine .layer:nth-of-type(1) {
    -webkit-animation: floatMachineLayer 10s 3.1s infinite ease;
    animation: floatMachineLayer 10s 3.1s infinite ease
}

.laboratory .machine .box_machine .layer:nth-of-type(2) {
    -webkit-animation: floatMachineLayer2 10s 3.1s infinite ease;
    animation: floatMachineLayer2 10s 3.1s infinite ease
}

.laboratory .machine .chart_machine {
    -webkit-animation: fadeIn 1s 1.1s forwards linear;
    animation: fadeIn 1s 1.1s forwards linear;
    height: 31px;
    width: 46.5px;
    background: #00B27A;
    display: inline-block;
    position: absolute;
    -webkit-transform: skewY(30deg);
    transform: skewY(30deg);
    top: 83px;
    left: 17px
}

.laboratory .machine .chart_machine .lines {
    -webkit-animation: fadeIn 1s 2.1s forwards linear;
    animation: fadeIn 1s 2.1s forwards linear;
    overflow: hidden;
    left: 0;
    bottom: 5px;
    width: 50px;
    height: 24px;
    display: inline-block
}

.laboratory .machine .chart_machine .lines .line {
    background: #02E882;
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: 3px;
    left: 2px;
    -webkit-animation: floatMachineLine80 7s 2.1s infinite ease;
    animation: floatMachineLine80 7s 2.1s infinite ease
}

@-webkit-keyframes floatMachineLine80 {
    from,to {
        opacity: 1;
        -webkit-transform: translate3d(0,80%,0);
        transform: translate3d(0,80%,0)
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,5%,0);
        transform: translate3d(0,5%,0)
    }
}

@keyframes floatMachineLine80 {
    from,to {
        opacity: 1;
        -webkit-transform: translate3d(0,80%,0);
        transform: translate3d(0,80%,0)
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,5%,0);
        transform: translate3d(0,5%,0)
    }
}

.laboratory .machine .chart_machine .lines .line:nth-child(1) {
    left: 2.5px;
    height: 30%
}

.laboratory .machine .chart_machine .lines .line:nth-child(2) {
    left: 8px;
    height: 50%
}

.laboratory .machine .chart_machine .lines .line:nth-child(3) {
    left: 13.5px;
    height: 35%
}

.laboratory .machine .chart_machine .lines .line:nth-child(4) {
    left: 19px;
    height: 80%
}

.laboratory .machine .chart_machine .lines .line:nth-child(5) {
    left: 24.5px;
    height: 45%
}

.laboratory .machine .chart_machine .lines .line:nth-child(6) {
    left: 30px;
    height: 85%
}

.laboratory .machine .chart_machine .lines .line:nth-child(7) {
    left: 35.5px;
    height: 60%
}

.laboratory .machine .chart_machine .lines .line:nth-child(8) {
    left: 41px;
    height: 65%
}

.laboratory .machine_light1 {
    left: 255px;
    top: 51px;
    -webkit-animation: fadeInUp .5s 1.3s forwards linear;
    animation: fadeInUp .5s 1.3s forwards linear
}

.laboratory .machine_light2 {
    left: 255px;
    top: 34px;
    -webkit-animation: fadeIn .5s 2.1s forwards linear;
    animation: fadeIn .5s 2.1s forwards linear
}

.laboratory .machine_light {
    left: 255px;
    top: 8px;
    -webkit-animation: flash 5s 2.1s forwards linear infinite;
    animation: flash 5s 2.1s forwards linear infinite
}

.laboratory .laptop {
    top: 89px;
    left: -8px;
    -webkit-animation: fadeInDown 1s 1.3s forwards linear;
    animation: fadeInDown 1s 1.3s forwards linear
}

.laboratory .laptop img {
    width: 291px;
    height: 308px
}

.laboratory .laptop .box_laptop {
    top: 0;
    left: 0;
    -webkit-animation: floatRight2 1.7s 3.3s forwards linear;
    animation: floatRight2 1.7s 3.3s forwards linear
}

.laboratory .laptop .box_laptop .layer {
    height: 116px;
    width: 153px;
    background-image: linear-gradient(125deg,#fff,rgba(255,255,255,.73));
    display: inline-block;
    -webkit-transform: skewY(-29.5deg);
    transform: skewY(-29.5deg);
    top: 57px;
    left: 13px;
    opacity: 1
}

.laboratory .laptop .box_laptop .layer .page {
    opacity: 1
}

.laboratory .laptop .box_laptop .layer .page .picture {
    left: 9px;
    top: 11px;
    opacity: 1
}

.laboratory .laptop .box_laptop .layer .page .text {
    display: inline-block;
    background: #D7D8D8;
    opacity: .3
}

.laboratory .laptop .box_laptop .layer .page .text:nth-of-type(1) {
    width: 27px;
    height: 20px;
    left: 47px;
    top: 12px
}

.laboratory .laptop .box_laptop .layer .page .text:nth-of-type(2) {
    width: 17px;
    height: 3px;
    left: 47px;
    top: 35px
}

.laboratory .laptop .box_laptop .layer .page .text:nth-of-type(3) {
    width: 27px;
    height: 3px;
    left: 47px;
    top: 42px
}

.laboratory .laptop .box_laptop .layer .page .text:nth-of-type(4) {
    width: 20px;
    height: 3px;
    left: 47px;
    top: 49px
}

.laboratory .laptop .box_laptop .layer .page .text:nth-of-type(5) {
    left: 9px;
    top: 62px;
    height: 27px;
    width: 66px
}

.laboratory .laptop .box_laptop .layer .chart-bar {
    width: 65px;
    height: 39px;
    bottom: 12px;
    left: 20px;
    overflow: hidden;
    opacity: 1
}

.laboratory .laptop .box_laptop .layer .chart-bar .bar {
    background: #02f0f2;
    height: 4px;
    -webkit-animation: fadeInLeft 1.5s 5s forwards linear;
    animation: fadeInLeft 1.5s 5s forwards linear
}

.laboratory .laptop .box_laptop .layer .chart-bar .bar:nth-of-type(1) {
    width: 30%;
    top: 0
}

.laboratory .laptop .box_laptop .layer .chart-bar .bar:nth-of-type(2) {
    width: 80%;
    top: 8px
}

.laboratory .laptop .box_laptop .layer .chart-bar .bar:nth-of-type(3) {
    width: 40%;
    top: 16px
}

.laboratory .laptop .box_laptop .layer .chart-bar .bar:nth-of-type(4) {
    width: 90%;
    top: 24px
}

.laboratory .laptop .box_laptop .layer .user-box {
    right: 27px;
    width: 37px;
    height: 74px;
    top: 15px;
    -webkit-animation: fadeIn 1s 5s forwards linear;
    animation: fadeIn 1s 5s forwards linear
}

.laboratory .laptop .box_laptop .layer .user-box .user {
    width: 37px;
    height: 74px
}

.laboratory .laptop .box_laptop .layer .user-box .user:nth-of-type(1) {
    background-image: linear-gradient(to bottom,#01f77a,rgba(1,247,122,0));
    opacity: .3
}

@-webkit-keyframes floatUser2 {
    from,to {
        opacity: .5;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(10px,10px,0);
        transform: translate3d(10px,10px,0)
    }
}

@keyframes floatUser2 {
    from,to {
        opacity: .5;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: .5;
        -webkit-transform: translate3d(10px,10px,0);
        transform: translate3d(10px,10px,0)
    }
}

.laboratory .laptop .box_laptop .layer .user-box .user:nth-of-type(2) {
    background-image: linear-gradient(to bottom,#01f77a,rgba(1,247,122,.2));
    -webkit-animation: floatUser2 10s 5s infinite ease;
    animation: floatUser2 10s 5s infinite ease
}

@-webkit-keyframes floatUser3 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(20px,20px,0);
        transform: translate3d(20px,20px,0)
    }
}

@keyframes floatUser3 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(20px,20px,0);
        transform: translate3d(20px,20px,0)
    }
}

.laboratory .laptop .box_laptop .layer .user-box .user:nth-child(3) {
    background-image: linear-gradient(to bottom,#01f77a,rgba(1,247,122,.45));
    -webkit-animation: floatUser3 10s 5s infinite ease;
    animation: floatUser3 10s 5s infinite ease
}

.laboratory .phone {
    top: 350px;
    left: 209px;
    -webkit-animation: fadeInDown 1s 2.3s forwards linear;
    animation: fadeInDown 1s 2.3s forwards linear
}

.laboratory .phone img {
    width: 177px;
    height: 110px
}

@-webkit-keyframes floatUp20 {
    from,to {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@keyframes floatUp20 {
    from,to {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,-20px,0);
        transform: translate3d(0,-20px,0)
    }
}

@-webkit-keyframes floatUp40 {
    from,to {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,-40px,0);
        transform: translate3d(0,-40px,0)
    }
}

@keyframes floatUp40 {
    from,to {
        opacity: 0;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(0,-40px,0);
        transform: translate3d(0,-40px,0)
    }
}

.laboratory .phone .box_phone:nth-of-type(1) {
    -webkit-animation: floatUp20 10s 4.8s infinite ease;
    animation: floatUp20 10s 4.8s infinite ease
}

.laboratory .phone .box_phone:nth-of-type(2) {
    -webkit-animation: floatUp40 10s 4.8s infinite ease;
    animation: floatUp40 10s 4.8s infinite ease
}

.laboratory .phone .box_phone .layer {
    -webkit-animation: fadeIn 2s 4.8s forwards linear;
    animation: fadeIn 2s 4.8s forwards linear;
    display: inline-block;
    -webkit-transform: skewX(-60deg) skewY(16deg);
    transform: skewX(-60deg) skewY(16deg);
    top: -88px;
    left: 32px;
    height: 51px;
    width: 118px;
    background-color: rgba(255,255,255,.5)
}

.laboratory .mac {
    top: -6px;
    left: 441px;
    -webkit-animation: fadeInDown .5s 3.3s forwards linear;
    animation: fadeInDown .5s 3.3s forwards linear
}

.laboratory .mac img {
    width: 237px;
    height: 379px
}

.laboratory .mac .box_mac {
    top: 0;
    -webkit-animation: floatLeft 1s 6.6s forwards linear;
    animation: floatLeft 1s 6.6s forwards linear
}

.laboratory .mac .box_mac .layer {
    height: 174px;
    width: 217px;
    background-image: linear-gradient(151deg,#fff,rgba(255,255,255,.54));
    display: inline-block;
    -webkit-transform: skewY(30deg);
    transform: skewY(30deg);
    top: 76px;
    left: 7px;
    opacity: .9
}

.laboratory .mac .box_mac .layer .folder {
    left: 8px;
    top: 10px
}

@-webkit-keyframes floatFolder1 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(-30px,35px,0);
        transform: translate3d(-30px,35px,0)
    }
}

@keyframes floatFolder1 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(-30px,35px,0);
        transform: translate3d(-30px,35px,0)
    }
}

@-webkit-keyframes floatFolder2 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(-15px,17.5px,0);
        transform: translate3d(-15px,17.5px,0)
    }
}

@keyframes floatFolder2 {
    from,to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }

    75% {
        opacity: 1;
        -webkit-transform: translate3d(-15px,17.5px,0);
        transform: translate3d(-15px,17.5px,0)
    }
}

.laboratory .mac .box_mac .layer .folder:nth-of-type(1) {
    opacity: 1
}

.laboratory .mac .box_mac .layer .folder:nth-of-type(3) {
    -webkit-animation: floatFolder1 10s 7.6s infinite ease;
    animation: floatFolder1 10s 7.6s infinite ease
}

.laboratory .mac .box_mac .layer .folder:nth-of-type(2) {
    -webkit-animation: floatFolder2 10s 7.6s infinite ease;
    animation: floatFolder2 10s 7.6s infinite ease
}

.laboratory .mac .box_mac .layer .chart-pie {
    -webkit-animation: pieRotateIn 1.5s 8.6s forwards linear;
    animation: pieRotateIn 1.5s 8.6s forwards linear;
    left: 14px;
    bottom: 15px
}

@-webkit-keyframes pieRotateIn {
    from {
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: rotate(720deg) scale3d(0.1,.1,1);
        transform: rotate(720deg) scale3d(0.1,.1,1);
        opacity: 0
    }

    to {
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: none;
        transform: none;
        opacity: 1
    }
}

@keyframes pieRotateIn {
    from {
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: rotate(720deg) scale3d(0.1,.1,1);
        transform: rotate(720deg) scale3d(0.1,.1,1);
        opacity: 0
    }

    to {
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-transform: none;
        transform: none;
        opacity: 1
    }
}

.laboratory .mac .box_mac .layer .chart-progress {
    top: 30px;
    right: 100px;
    -webkit-animation: fadeIn 1s 7.6s forwards linear;
    animation: fadeIn 1s 7.6s forwards linear
}

.laboratory .mac .box_mac .layer .chart-progress .progress-circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    opacity: 1
}

.laboratory .mac .box_mac .layer .chart-progress .progress-circle:nth-of-type(1) {
    top: 0;
    background: #01f77a
}

.laboratory .mac .box_mac .layer .chart-progress .progress-circle:nth-of-type(2) {
    top: 20px;
    background: #00c084
}

.laboratory .mac .box_mac .layer .chart-progress .progress-circle:nth-of-type(3) {
    top: 40px;
    background: #00b27a
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box {
    left: 17px;
    width: 70px;
    overflow: hidden;
    height: 50px;
    opacity: 1
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar {
    display: inline-block;
    height: 2px;
    left: 5px;
    background: #D9D9D9;
    -webkit-animation: fadeInLeft 1s 8.6s forwards linear;
    animation: fadeInLeft 1s 8.6s forwards linear
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(1) {
    width: 70%;
    top: 0
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(2) {
    width: 60%;
    top: 4px
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(3) {
    width: 75%;
    top: 20px
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(4) {
    width: 70%;
    top: 24px
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(5) {
    width: 50%;
    top: 40px
}

.laboratory .mac .box_mac .layer .chart-progress .progress-bar-box .progress-bar:nth-of-type(6) {
    width: 80%;
    top: 44px
}

.laboratory .mac .box_mac .layer .chart-bar {
    bottom: 18px;
    right: 26px;
    width: 105px;
    height: 65px;
    overflow: hidden;
    -webkit-animation: fadeIn 2s 7.6s forwards linear;
    animation: fadeIn 2s 7.6s forwards linear
}

@-webkit-keyframes floatBar80 {
    from,to {
        -webkit-transform: translate3d(0,20%,0);
        transform: translate3d(0,20%,0);
        opacity: 1
    }

    50% {
        -webkit-transform: translate3d(0,80%,0);
        transform: translate3d(0,80%,0);
        opacity: 1
    }
}

@keyframes floatBar80 {
    from,to {
        -webkit-transform: translate3d(0,20%,0);
        transform: translate3d(0,20%,0);
        opacity: 1
    }

    50% {
        -webkit-transform: translate3d(0,80%,0);
        transform: translate3d(0,80%,0);
        opacity: 1
    }
}

@-webkit-keyframes floatBar90 {
    from,to {
        -webkit-transform: translate3d(0,90%,0);
        transform: translate3d(0,90%,0);
        opacity: 1
    }

    25%,75% {
        -webkit-transform: translate3d(0,50%,0);
        transform: translate3d(0,50%,0);
        opacity: 1
    }

    50% {
        -webkit-transform: translate3d(0,10%,0);
        transform: translate3d(0,10%,0);
        opacity: 1
    }
}

@keyframes floatBar90 {
    from,to {
        -webkit-transform: translate3d(0,90%,0);
        transform: translate3d(0,90%,0);
        opacity: 1
    }

    25%,75% {
        -webkit-transform: translate3d(0,50%,0);
        transform: translate3d(0,50%,0);
        opacity: 1
    }

    50% {
        -webkit-transform: translate3d(0,10%,0);
        transform: translate3d(0,10%,0);
        opacity: 1
    }
}

.laboratory .mac .box_mac .layer .chart-bar .bar {
    display: inline-block;
    width: 5px;
    bottom: 0;
    height: 100%;
    background: #02F0F2
}

.laboratory .mac .box_mac .layer .chart-bar .bar::after {
    display: inline-block;
    background: #D7D8D8;
    width: 100%;
    height: 100%;
    content: '';
    opacity: .3;
    margin-left: 7px;
    margin-top: -10px
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(1) {
    left: 15px;
    -webkit-animation: floatBar80 15s 7.6s ease infinite;
    animation: floatBar80 15s 7.6s ease infinite
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(2) {
    left: 30px;
    -webkit-animation: floatBar90 9.2s 7.6s ease infinite;
    animation: floatBar90 9.2s 7.6s ease infinite
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(3) {
    left: 45px;
    -webkit-animation: floatBar80 14s 7.6s ease infinite;
    animation: floatBar80 14s 7.6s ease infinite
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(4) {
    left: 60px;
    -webkit-animation: floatBar90 11s 7.6s ease infinite;
    animation: floatBar90 11s 7.6s ease infinite
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(5) {
    left: 75px;
    -webkit-animation: floatBar80 10.3s 7.6s ease infinite;
    animation: floatBar80 10.3s 7.6s ease infinite
}

.laboratory .mac .box_mac .layer .chart-bar .bar:nth-child(6) {
    left: 90px;
    -webkit-animation: floatBar90 16s 7.6s ease infinite;
    animation: floatBar90 16s 7.6s ease infinite
}

.laboratory .cord {
    left: 147px;
    top: 214px;
    opacity: 1
}

@-webkit-keyframes dash {
    to {
        stroke-dashoffset: 0
    }
}

@keyframes dash {
    to {
        stroke-dashoffset: 0
    }
}

.laboratory .cord .line_laptop {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    -webkit-animation: dash 1s 2.3s forwards linear;
    animation: dash 1s 2.3s forwards linear
}

.laboratory .cord .line_phone {
    stroke-dasharray: 465;
    stroke-dashoffset: 465;
    -webkit-animation: dash 1.5s 3.3s forwards linear;
    animation: dash 1.5s 3.3s forwards linear
}

.laboratory .cord .line_mac1 {
    stroke-dasharray: 140;
    stroke-dashoffset: 140;
    -webkit-animation: dash .9s 4.8s forwards linear;
    animation: dash .9s 4.8s forwards linear
}

.laboratory .cord .line_mac2 {
    stroke-dasharray: 345;
    stroke-dashoffset: 345;
    -webkit-animation: dash .9s 5.7s forwards linear;
    animation: dash .9s 5.7s forwards linear
}

.laboratory .stars {
    left: 278px;
    top: 51px;
    -webkit-animation: fadeIn 1.5s 2.1s forwards linear;
    animation: fadeIn 1.5s 2.1s forwards linear
}

.laboratory .stars .star {
    position: absolute
}

.laboratory .stars .star::before,.laboratory .stars .star::after {
    content: '';
    background: #fff;
    display: inline-block;
    position: absolute
}

.laboratory .stars .star::after {
    width: 2px;
    height: 7.5px;
    top: -2.75px
}

.laboratory .stars .star::before {
    width: 7.5px;
    height: 2px;
    left: -2.75px
}

.laboratory .stars .star:nth-child(1),.laboratory .stars .star:nth-child(2),.laboratory .stars .star:nth-child(3) {
    -webkit-animation: floatDown 5s 0s forwards ease-in-out infinite;
    animation: floatDown 5s 0s forwards ease-in-out infinite;
    left: 30px
}

.laboratory .stars .star:nth-child(4),.laboratory .stars .star:nth-child(5),.laboratory .stars .star:nth-child(6) {
    -webkit-animation: floatDown2 5s 0s forwards ease-in-out infinite;
    animation: floatDown2 5s 0s forwards ease-in-out infinite
}

.laboratory .stars .star:nth-child(1) {
    top: -20px
}

.laboratory .stars .star:nth-child(2) {
    top: -35px
}

.laboratory .stars .star:nth-child(3) {
    top: -50px
}

.laboratory .stars .star:nth-child(4) {
    top: -25px
}

.laboratory .stars .star:nth-child(5) {
    top: -40px
}

.laboratory .stars .star:nth-child(6) {
    top: -55px
}

</style>
