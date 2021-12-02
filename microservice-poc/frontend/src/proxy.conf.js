const PROXY_CONFIG = [
  {
      context: [
          "/user",
          "/product",
      ],
      target: "http://localhost:80/microservice-poc/backend/index.php",
      secure: false
  }
]

module.exports = PROXY_CONFIG;