import { test, request, expect } from "@playwright/test";
import { Article } from "../../interfaces/Article";
import articles from "../../test-data/articles.json";
import { ArticlePayload } from "../../interfaces/ArticlePayload";

//______GET__________________________________________________________
// sans typage des données
test("Get users from JSONPlaceholder API", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  //console.log(body);
  expect(body.length).toBeGreaterThan(0);

  expect(body[0].id).toBe(1);
  expect(body[0]).toHaveProperty("title");
  expect(body[0]).toHaveProperty("body");
  expect(typeof body[0].title).toBe("string");
});

// avec typage des données via interface Post
test("Get users from JSONPlaceholder API through interface", async ({
  request,
}) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  expect(response.ok()).toBeTruthy();

  const body: Article[] = await response.json();
  //console.log(body);
  expect(body.length).toBeGreaterThan(0);

  expect(body[0].id).toBe(1);
  expect(body[0]).toHaveProperty("title");
  expect(body[0]).toHaveProperty("body");
  // expect(typeof body[0].title).toBe("string");   inutile avec typage
});

// sans typage des données
test("create POST with JSONPlaceholder API", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        userId: 666,
        title: "Book Title",
        body: "John Doe",
      },
    },
  );
  expect(response.ok()).toBeTruthy(); // moins pertinent que le suivant
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchObject({ userId: 666, title: "Book Title" });
  expect(typeof body.userId).toBe("number");
  expect(typeof body.title).toBe("string");
  expect(typeof body.body).toBe("string");
});

// Avec type des données via l'interface Post
test("create POST 2 with JSONPlaceholder API", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        userId: 123,
        title: "Loving API power",
        body: "this is a very long body",
      },
    },
  );

  expect(response.status()).toBe(201);

  const body: Article = await response.json();
  expect(body).toMatchObject({
    userId: 123,
    title: "Loving API power",
    body: "this is a very long body",
  });

  expect(body.id).toBeDefined();

  // inutile avec le typage des données issu de l'interface Post
  /*   expect(typeof body.userId).toBe("number");
  expect(typeof body.title).toBe("string");
  expect(typeof body.body).toBe("string");
 */
});

// avec typage et jeux de données
test("create POST 3 with JSONPlaceholder API", async ({ request }) => {
  const payload: ArticlePayload = articles.article_1;

  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    { data: payload }
  );

  expect(response.status()).toBe(201);

  const body: Article = await response.json();
  // console.log(body);
  expect(body.id).toBeDefined();
  expect(body).toMatchObject(articles.article_1);

});

test("")
