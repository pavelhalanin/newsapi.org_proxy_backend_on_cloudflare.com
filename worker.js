const ENV_API_KEY = "МойApiКлюч";

export default {
  async fetch(request, env, ctx) {
    const httpMethod = request.method;
    if (httpMethod !== "GET") {
      throw new Error(
        "Логическая ошибка. Данный скрипт предусматривает только метод GET",
      );
    }

    const url = new URL(request.url);
    const httpPathName = url.pathname;
    const httpGetParamsObject = Object.fromEntries(url.searchParams.entries());
    const httpGetParams = url.search || "?";

    try {
      const fetchUrl = `https://newsapi.org${httpPathName}${httpGetParams}&apiKey=${ENV_API_KEY}`;
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "User-Agent": "MyWorker/1.0 (+https://example.com)",
          Accept: "application/json",
        },
      });

      const httpStatus = response.status;
      if (httpStatus !== 200) {
        try {
          const TEXT = await response.text();
          throw new Error(`HTTP ${httpStatus}\n${fetchUrl}\n${TEXT}`);
        } catch (exception) {
          throw new Error(`HTTP ${httpStatus}\n${fetchUrl}\n${exception}`);
        }
      }

      const data = await response.json();
      const DATA = {
        httpMethod: httpMethod,
        httpPathName: httpPathName,
        httpGetParams: httpGetParams,
        httpGetParamsObject: httpGetParamsObject,
        data: data,
      };

      return new Response(JSON.stringify(DATA), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (exception) {
      const DATA = {
        httpMethod: httpMethod,
        httpPathName: httpPathName,
        httpGetParams: httpGetParams,
        httpGetParamsObject: httpGetParamsObject,
        message: `${exception}`,
      };
      return new Response(JSON.stringify(DATA), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
