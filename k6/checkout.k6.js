import { group } from "k6"

import URLS from "./utils/urls.js"
import { Request } from "./utils/request.js"
import Report from "./utils/report.js"

const request = new Request()

export const options = {
  stages: [
    // Ramp-up from 1 to 30 VUs in 30s
    { duration: "1s", target: 30 },

    // Stay on 30 VUs for 60s
    { duration: "5s", target: 30 },

    // Ramp-down from 30 to 0 VUs in 10s
    { duration: "1s", target: 0 },
  ],
}

export default function () {
  group("workflow-run", function () {
    request.get(URLS.checkoutUrl, "checkout")
  })
}

export function handleSummary(data) {
  return {
    [Report.fileName]: JSON.stringify(data),
  }
}
