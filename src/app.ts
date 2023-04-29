const schedule = require('node-schedule')
const cronParser = require('cron-parser')
const ALLOWED_TIME_VARIANCE_IN_MILLISECONDS: number = 1000
console.log(new Date())

const job = schedule.scheduleJob('* * * * * *', () => {
  task1()
})

function shouldCronJobRun (cron: string): boolean {
  let result: boolean = false
  const date: Date = new Date()
  const interval: any = cronParser.parseExpression(cron)
  const intervalDate: Date = interval.next().toDate()
  const tolerance: number = 1000
  result =
    Math.abs(intervalDate.getTime() - date.getTime()) <=
    ALLOWED_TIME_VARIANCE_IN_MILLISECONDS
  return result
}

function task1 (): void {
  const cron: string = '*/2 * * * *' //derive from database with endpoint of the function executing this
  const execute: boolean = shouldCronJobRun(cron)

  if (execute) {
    console.log(`Run cron job! ${new Date().toString()}`)
  }
}
