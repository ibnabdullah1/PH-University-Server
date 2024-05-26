import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`App is listening at http://localhost:${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()
