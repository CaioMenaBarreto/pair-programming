import supertest from "supertest";
import app from "../src/index";
import fruits from "data/fruits";
import fruitsService from "services/fruits-service";
const api = supertest(app);



describe("/POST fruits", () => {
    it("should return 201 when inserting a fruit", async () => {
        const fruit = {
            name: "Apple",
            price: 10
        }

        const { status } = await api.post("/fruits").send(fruit);
        expect(status).toBe(201);
    })

    it("should return 409 when inserting a fruit that is already registered", async () => {
        const fruit = {
            id: 1,
            name: "Apple",
            price: 10
        }
        fruits.push(fruit);
        const sendFruit = {
            name: "Apple",
            price: 10
        }
        const { status } = await api.post("/fruits").send(sendFruit);
        expect(status).toBe(409);
    })

    it("should return 422 when inserting a fruit with data missing", async () => {
        const fruit = {
            id: 1,
            name: "Apple",
            price: 10
        }
        fruits.push(fruit);
        const { status } = await api.post("/fruits").send(fruit);
        expect(status).toBe(422);
    })
})

describe("/GET fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
        const id = 10000;
        const { status } = await api.get(`/fruits/${id}`);
        expect(status).toBe(404);
    })
    it("should return 400 when id param is present but not valid", async () => {
        const id = "eduardo";
        const { status } = await api.get(`/fruits/${id}`);
        expect(status).toBe(400);

    })

    it("should return one fruit when given a valid and existing id", async () => {
        const id = 1;
        const fruit = await api.get(`/fruits/${id}`);
        expect(fruit).toEqual(fruit);
    });

    it("should return all fruits if no id is present", async () => {
        const fruit1 =
        {
            id: 1,
            name: "Apple",
            price: 10
        }
        const fruit2 =
        {
            id: 2,
            name: "banana",
            price: 10
        }
        fruits.push(fruit1);
        fruits.push(fruit2);
        const { body } = await api.get(`/fruits`);
        expect(body).toEqual(fruits);
    })
})