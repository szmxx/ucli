/*
 * @Author: cola
 * @Date: 2023-09-08 13:10:03
 * @LastEditors: cola
 * @Description:
 */
export const TemplateMap = {
  vite: {
    provider: "github",
    username: "szmxx",
    name: "template-vite",
    defaultDir: "vite-app",
    features: [
      {
        name: "主题",
        default: true,
        value: "theme",
      },
      {
        name: "多语言",
        default: false,
        value: "i18n",
      },
    ],
    components: ["empty", "element-plus", "vant"],
  },
  nuxt3: {
    provider: "github",
    name: "template-nuxt3",
    defaultDir: "nuxt3-app",
    username: "szmxx",
    features: [
      {
        name: "主题",
        default: true,
        value: "theme",
      },
      {
        name: "多语言",
        default: false,
        value: "i18n",
      },
    ],
    components: ["empty", "element-plus", "vant"],
  },
  node: {
    provider: "github",
    name: "template-node",
    defaultDir: "node-app",
    username: "szmxx",
    features: [],
  },
};

export const TemplateList = Object.keys(TemplateMap);
// https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#searching-github-by-license-type
export const LicenseList = [
  "mit",
  "apache-2.0",
  "gpl-3.0",
  "lgpl-3.0",
  "bsd-4-clause",
  "mpl-2.0",
  "cc-by-sa-4.0",
];
