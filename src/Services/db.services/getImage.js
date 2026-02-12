export const getImage = () => {
  return fetch(
    `https://momchilbg.github.io/image-cdn/data/koleloto/images.json`,
  )
    .then((res) => {
      const json = res.json();
      return json;
    })
    .then((files) => {
      const index = Math.floor(Math.random() * files.length);
      const fileName = files[index];

      return `https://momchilbg.github.io/image-cdn/images/koleloto/${fileName.file}`;
    });
};
