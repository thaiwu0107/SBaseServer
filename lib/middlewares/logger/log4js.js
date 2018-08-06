"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const config_log4js_1 = require("../../config/config.log4js");
// configure log4js
log4js.configure(config_log4js_1.default);
const DEFAULT_FORMAT = '[:response-time ms] :userid - ' +
    ':remote-addr - -' +
    ' ":method :url HTTP/:http-version"' +
    ' :status :content-length ":referrer"' +
    ' ":user-agent"';
const koaLog4jsOptions = {
    level: 'auto',
    format: DEFAULT_FORMAT,
    tokens: [{
            token: ':userid', content: (ctx) => {
                return getAuthUser(ctx.state);
            }
        }]
};
exports.default = () => {
    const logger = log4js.getLogger('request');
    return log4js.koaLogger(logger, koaLog4jsOptions);
};
function getLogger(name) {
    const logger = log4js.getLogger(name);
    // logger.addContext('user', 'Mike'); // TODO : how to get ctx.state.user ??
    return logger;
}
exports.getLogger = getLogger;
function getAuthUser(token) {
    if (token && !_.isUndefined(token.user)) {
        return token.user.operatorName;
    }
    else {
        return 'anonymity';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nNGpzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibWlkZGxld2FyZXMvbG9nZ2VyL2xvZzRqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsOERBQXNEO0FBRXRELG1CQUFtQjtBQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUFZLENBQUMsQ0FBQztBQUUvQixNQUFNLGNBQWMsR0FBRyxnQ0FBZ0M7SUFDbkQsa0JBQWtCO0lBQ2xCLG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFDdEMsZ0JBQWdCLENBQUM7QUFDckIsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE1BQU0sRUFBRSxDQUFDO1lBQ0wsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLENBQUM7U0FDSixDQUFDO0NBQ0wsQ0FBQztBQUVGLGtCQUFlLEdBQUcsRUFBRTtJQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFFRixTQUFTLFNBQVMsQ0FBQyxJQUFZO0lBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsNEVBQTRFO0lBQzVFLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFVUSw4QkFBUztBQVJsQixTQUFTLFdBQVcsQ0FBQyxLQUFLO0lBQ3RCLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUNsQztTQUFNO1FBQ0gsT0FBTyxXQUFXLENBQUM7S0FDdEI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBsb2c0anNDb25maWcgZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy5sb2c0anMnO1xuXG4vLyBjb25maWd1cmUgbG9nNGpzXG5sb2c0anMuY29uZmlndXJlKGxvZzRqc0NvbmZpZyk7XG5cbmNvbnN0IERFRkFVTFRfRk9STUFUID0gJ1s6cmVzcG9uc2UtdGltZSBtc10gOnVzZXJpZCAtICcgK1xuICAgICc6cmVtb3RlLWFkZHIgLSAtJyArXG4gICAgJyBcIjptZXRob2QgOnVybCBIVFRQLzpodHRwLXZlcnNpb25cIicgK1xuICAgICcgOnN0YXR1cyA6Y29udGVudC1sZW5ndGggXCI6cmVmZXJyZXJcIicgK1xuICAgICcgXCI6dXNlci1hZ2VudFwiJztcbmNvbnN0IGtvYUxvZzRqc09wdGlvbnMgPSB7XG4gICAgbGV2ZWw6ICdhdXRvJyxcbiAgICBmb3JtYXQ6IERFRkFVTFRfRk9STUFULFxuICAgIHRva2VuczogW3tcbiAgICAgICAgdG9rZW46ICc6dXNlcmlkJywgY29udGVudDogKGN0eCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdldEF1dGhVc2VyKGN0eC5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIGNvbnN0IGxvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIoJ3JlcXVlc3QnKTtcbiAgICByZXR1cm4gbG9nNGpzLmtvYUxvZ2dlcihsb2dnZXIsIGtvYUxvZzRqc09wdGlvbnMpO1xufTtcblxuZnVuY3Rpb24gZ2V0TG9nZ2VyKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGxvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIobmFtZSk7XG4gICAgLy8gbG9nZ2VyLmFkZENvbnRleHQoJ3VzZXInLCAnTWlrZScpOyAvLyBUT0RPIDogaG93IHRvIGdldCBjdHguc3RhdGUudXNlciA/P1xuICAgIHJldHVybiBsb2dnZXI7XG59XG5cbmZ1bmN0aW9uIGdldEF1dGhVc2VyKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmICFfLmlzVW5kZWZpbmVkKHRva2VuLnVzZXIpKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi51c2VyLm9wZXJhdG9yTmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ2Fub255bWl0eSc7XG4gICAgfVxufVxuXG5leHBvcnQgeyBnZXRMb2dnZXIgfTtcbiJdfQ==