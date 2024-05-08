
import { hashPW } from './op';


afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Test-hash-md5', () => {

    describe('[DELETE] /users/:id', () => {
        it('testa200', async () => {
            // hash 200 should be 95793DFC73553A12F1856E62D39AE1A8
            let p = hashPW("200")
            expect(p).toBe("95793DFC73553A12F1856E62D39AE1A8")
        });
    });
});
