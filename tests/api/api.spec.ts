import { test, request, expect } from "@playwright/test";
import { Article } from "../../interfaces/Article";
import articles from "../../test-data/articles.json";
import { ArticlePayload, ArticlesData } from "../../interfaces/ArticlePayload";
import { PatchArticlePayload } from "../../interfaces/PatchArticlePayload";

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

//______POST__________________________________________________________
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

// Avec type des données via l'interface Article
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
  const payload: ArticlePayload = articles.articles[0];

  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    { data: payload },
  );

  expect(response.status()).toBe(201);

  const body: Article = await response.json();
  // console.log(body);
  expect(body.id).toBeDefined();
  expect(body).toMatchObject({ ...articles.articles[0] });
});

// avec typage et plusieurs jeux de données json
const testData: ArticlesData = articles;

for (const article of testData.articles) {
  // inférence de type pour article

  test(`create article with JSONPlaceholder API - ${article.title}`, async ({
    request,
  }) => {
    const newArticle = await request.post(
      "https://jsonplaceholder.typicode.com/posts",
      { data: article },
    );
    expect(newArticle.status()).toBe(201);

    const createdArticle: Article = await newArticle.json();
    expect(createdArticle.id).toBeDefined();
    expect(createdArticle).toMatchObject({ ...article });
  });
}

//______PUT__________________________________________________________
// modifier une data et vérifier ensuite la modification
test(`Update article with JSONPlaceholder API - `, async ({ request }) => {
  const payload: Article = articles.articlesToUpdate[0];
  const articleToUpdate = await request.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    { data: payload },
  );
  const UpdatedArticle = await articleToUpdate.json();
  console.log(UpdatedArticle);
  expect(UpdatedArticle).toMatchObject({ ...articles.articlesToUpdate[0] });
  expect(UpdatedArticle.title).toContain("update");
});

// modifier plusieurs articles du jeux de données et vérification
const dataToUpdate: Article[] = articles.articlesToUpdate;
for (const article of dataToUpdate) {
  test(`modify article with JSONPlaceholder API - ${article.title}`, async ({
    request,
  }) => {
    const articleToUpdate = await request.put(
      `https://jsonplaceholder.typicode.com/posts/${article.id}`,
      { data: article },
    );

    const updatedArticle: Article = await articleToUpdate.json();
    console.log(updatedArticle);
    expect(articleToUpdate.status()).toBe(200);

    expect(updatedArticle.id).toBeDefined();
    expect(updatedArticle.id).toBe(article.id);
    expect(updatedArticle).toMatchObject({ ...article });
  });
}

//______PATCH__________________________________________________________
const dataToPatch: PatchArticlePayload[] = articles.articlesToPatch;
for (const article of dataToPatch) {
  test(`modify article with JSONPlaceholder API - ${article.title}`, async ({
    request,
  }) => {
    console.log("Payload envoyé :", article);

    const articleToPatch = await request.patch(
      `https://jsonplaceholder.typicode.com/posts/${article.id}`,
      { data: article },
    );
    const patchedArticle: Article = await articleToPatch.json();
    console.log("Réponse :", patchedArticle);
    expect(articleToPatch.status()).toBe(200);
    // on vérifie uniquement les propriétés qui ont étées modifiées
    expect(patchedArticle.id).toBe(article.id);
    expect(patchedArticle.title).toBe(article.title);
  });
}
