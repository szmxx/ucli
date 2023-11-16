export const TemplateMap = {
  vite: {
    name: "template-vite",
    defaultDir: "vite-app",
    tar: "https://codeload.github.com/szmxx/template-vite/tar.gz/refs/heads/",
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
    components: ["empty", "element-plus", "vant", "qiankun"],
  },
  nuxt3: {
    name: "template-nuxt3",
    defaultDir: "nuxt3-app",
    tar: "https://codeload.github.com/szmxx/template-nuxt3/tar.gz/refs/heads/",
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
    name: "template-node",
    defaultDir: "node-app",
    tar: "https://codeload.github.com/szmxx/template-node/tar.gz/refs/heads/",
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
