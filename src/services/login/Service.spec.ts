// import { expect } from 'chai';
// import * as moment from 'moment';
// import { anything, instance, mock, reset, spy, when } from 'ts-mockito/lib/ts-mockito';

// import { Transaction } from '@ggttoo44/base-server';
// import { HttpStatusCode } from '../../config/enum.http';
// import { DaoEnum } from '../../context/daoEnum';
// import Repository from './Repository';
// import Service from './Service';

// describe('example', () => {
//     let test: Service;
//     let repository: Repository;
//     let mockSelf: Service;
//     let mockContext: GamaContext;
//     let mockTransaction: Transaction<DaoEnum>;
//     let expectDone;
//     const expected = (target?: any, message?: string) => {
//         expectDone = true;
//         return expect(target, message);
//     };
//     beforeEach(() => {
//         expectDone = false;
//         repository = mock(Repository);
//         test = new Service(instance(repository));
//         mockSelf = spy(test);
//         mockContext = mock(GamaContext);
//         mockTransaction = mock(Transaction);
//         when(mockTransaction.begin()).thenReturn(anything());
//         when(mockTransaction.commit()).thenReturn(anything());
//         when(mockTransaction.rollback()).thenReturn(anything());
//         GamaContext.setMockContext((instance(mockContext)));
//         when(mockContext.getBean(anything())).thenReturn((instance(mockTransaction)));
//     });
//     afterEach('這個方法有寫驗證但是沒有驗證到', () => {
//         expect(expectDone).to.equal(true);
//         reset(mockSelf);
//         reset(repository);
//         reset(mockContext);
//         reset(mockTransaction);
//     });
//     describe('findMemberCardById', () => {
//         it('空資料回傳NO_MATCH_DATA', async () => {
//             when(repository.test()).thenReturn(Promise.resolve({}));
//             try {
//                 await test.test();
//             } catch (error) {
//                 expected(error.status).to.deep.equal(HttpStatusCode.STATUS_NO_MATCH_DATA);
//             }
//         });
//         it('正確回傳資料', async () => {
//             when(repository.test()).thenReturn(Promise.resolve({ a: 1 }));
//             const rep = await test.test();
//             expected(rep).to.deep.equal({ msRank: { a: 1 } });
//         });
//     });
// });
