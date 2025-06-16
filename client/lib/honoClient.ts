import type { TaskEndpoints } from "@app/api";
import { hc } from "hono/client";
import { API_BASE_URL } from "~/constants/url";

export const client = hc<TaskEndpoints>(API_BASE_URL);
