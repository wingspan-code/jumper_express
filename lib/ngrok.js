import fs from 'fs'

export default (filename) => {
  const domain_rule = /(?<=url\=)[\w\-.:\/]+/g;
  const log = fs.readFileSync(filename, "utf8");
  try {
    const domain = log.match(domain_rule)[0];
    return domain;
  } catch (err) {
    console.error(err);
    console.log("ngrok file contents: \n", log);
  }
}
