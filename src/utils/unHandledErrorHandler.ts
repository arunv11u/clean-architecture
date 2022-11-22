export default function () {
  process.on("uncaughtException", (error) => {
    console.error(error.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (error) => {
    throw error;
  });
}
