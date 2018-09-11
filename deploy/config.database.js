"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = {
    MemberAck: {
        user: '$user1$',
        password: '$password1$',
        server: '$server1$',
        database: '$database1$',
        pool: {
            max: 100,
            min: 15,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false,
            useUTC: false
        }
    },
    CashlessAck: {
        user: '$user2$',
        password: '$password2$',
        server: '$server2$',
        database: '$database2$',
        pool: {
            max: 100,
            min: 15,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false,
            useUTC: false
        }
    },
    TicketingAck: {
        user: '$user3$',
        password: '$password3$',
        server: '$server3$',
        database: '$database3$',
        pool: {
            max: 100,
            min: 15,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false,
            useUTC: false
        }
    },
    JackpotAck: {
        user: '$user4$',
        password: '$password4$',
        server: '$server4$',
        database: '$database4$',
        pool: {
            max: 100,
            min: 15,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false,
            useUTC: false
        }
    },
    AccountingAck: {
        user: '$user5$',
        password: '$password5$',
        server: '$server5$',
        database: '$database5$',
        pool: {
            max: 100,
            min: 15,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false,
            useUTC: false
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRhdGFiYXNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jaHJpc2hzaWVoL0dDTVMzL2czYXBpc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcuZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDYSxRQUFBLEVBQUUsR0FBRztJQUNkLFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLE1BQU07UUFDaEIsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixRQUFRLEVBQUUsZUFBZTtRQUN6QixJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxFQUFFO1lBQ1AsaUJBQWlCLEVBQUUsS0FBSztTQUMzQjtRQUNELE9BQU8sRUFBRTtZQUNMLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFLEtBQUs7U0FDaEI7S0FDSjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLE1BQU07UUFDaEIsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLElBQUksRUFBRTtZQUNGLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEVBQUU7WUFDUCxpQkFBaUIsRUFBRSxLQUFLO1NBQzNCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsS0FBSztTQUNoQjtLQUNKO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsTUFBTTtRQUNoQixNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsSUFBSSxFQUFFO1lBQ0YsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsRUFBRTtZQUNQLGlCQUFpQixFQUFFLEtBQUs7U0FDM0I7UUFDRCxPQUFPLEVBQUU7WUFDTCxPQUFPLEVBQUUsS0FBSztZQUNkLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO0tBQ0o7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY29uc3QgZGIgPSB7XG4gICAgTWVtYmVyQWNrOiB7XG4gICAgICAgIHVzZXI6ICdzYScsXG4gICAgICAgIHBhc3N3b3JkOiAnZ2FtYScsXG4gICAgICAgIHNlcnZlcjogJzE5Mi4xNjguMTIyLjM3JyxcbiAgICAgICAgZGF0YWJhc2U6ICdNZW1iZXJfQWNrX0RUJyxcbiAgICAgICAgcG9vbDoge1xuICAgICAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgICAgICBtaW46IDE1LFxuICAgICAgICAgICAgaWRsZVRpbWVvdXRNaWxsaXM6IDMwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGVuY3J5cHQ6IGZhbHNlLFxuICAgICAgICAgICAgdXNlVVRDOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBKYWNrcG90QWNrOiB7XG4gICAgICAgIHVzZXI6ICdzYScsXG4gICAgICAgIHBhc3N3b3JkOiAnZ2FtYScsXG4gICAgICAgIHNlcnZlcjogJzE5Mi4xNjguMTIyLjM3JyxcbiAgICAgICAgZGF0YWJhc2U6ICdKYWNrcG90X0Fja19EVCcsXG4gICAgICAgIHBvb2w6IHtcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgbWluOiAxNSxcbiAgICAgICAgICAgIGlkbGVUaW1lb3V0TWlsbGlzOiAzMDAwMFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBlbmNyeXB0OiBmYWxzZSxcbiAgICAgICAgICAgIHVzZVVUQzogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQWNjb3VudGluZ0Fjazoge1xuICAgICAgICB1c2VyOiAnc2EnLFxuICAgICAgICBwYXNzd29yZDogJ2dhbWEnLFxuICAgICAgICBzZXJ2ZXI6ICcxOTIuMTY4LjEyMi4zNycsXG4gICAgICAgIGRhdGFiYXNlOiAnQWNjb3VudGluZ19BY2tfRFQnLFxuICAgICAgICBwb29sOiB7XG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIG1pbjogMTUsXG4gICAgICAgICAgICBpZGxlVGltZW91dE1pbGxpczogMzAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZW5jcnlwdDogZmFsc2UsXG4gICAgICAgICAgICB1c2VVVEM6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19