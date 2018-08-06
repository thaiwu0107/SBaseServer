"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumTracerconfigSetting;
(function (EnumTracerconfigSetting) {
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoFilter"] = 0] = "NoFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["AllFilter"] = 1] = "AllFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoBaseFilter"] = 2] = "NoBaseFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoRepositoryFilter"] = 3] = "NoRepositoryFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoControllerFilter"] = 4] = "NoControllerFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoServicFilter"] = 5] = "NoServicFilter";
})(EnumTracerconfigSetting = exports.EnumTracerconfigSetting || (exports.EnumTracerconfigSetting = {}));
function getEnumTracerconfigSetting(id) {
    switch (id) {
        default:
        case EnumTracerconfigSetting.NoFilter:
            return noFilter;
        case EnumTracerconfigSetting.NoBaseFilter:
            return noBaseFilter;
        case EnumTracerconfigSetting.NoRepositoryFilter:
            return noRepositoryFilter;
        case EnumTracerconfigSetting.NoControllerFilter:
            return noControllerFilter;
        case EnumTracerconfigSetting.NoServicFilter:
            return noServicFilter;
    }
}
exports.getEnumTracerconfigSetting = getEnumTracerconfigSetting;
// NOTE: 第一個*是class,第二個*是方法
// NOTE: 加上!就是不要,*前後就是關鍵字
const noFilter = [
    '*:*',
    '!Context*:*',
    '!SQLManager*:getDao*',
    '!SQLManager*:getDBCurrent***'
];
const allFilter = [
    '!*Repository:*',
    '!*Controller:*',
    '!Base*:*',
    '!*Servic:*'
];
const noBaseFilter = [
    '*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '*Servic:*'
];
const noRepositoryFilter = [
    '*Repository:find*',
    '*Repository:add*',
    '*Repository:change*',
    '*Repository:delete*',
    '!*Controller:*',
    '!Base*:*',
    '!*Servic:*'
];
const noControllerFilter = [
    '!*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '!*Servic:*'
];
const noServicFilter = [
    '!*Repository:*',
    '!*Controller:*',
    '!Base*:*',
    '*Servic:*'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW51bVRyYWNlcmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9FbnVtVHJhY2VyY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBWSx1QkFPWDtBQVBELFdBQVksdUJBQXVCO0lBQy9CLDZFQUFRLENBQUE7SUFDUiwrRUFBUyxDQUFBO0lBQ1QscUZBQVksQ0FBQTtJQUNaLGlHQUFrQixDQUFBO0lBQ2xCLGlHQUFrQixDQUFBO0lBQ2xCLHlGQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVBXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBT2xDO0FBQ0QsU0FBZ0IsMEJBQTBCLENBQUMsRUFBMkI7SUFDbEUsUUFBUSxFQUFFLEVBQUU7UUFDUixRQUFRO1FBQ1IsS0FBSyx1QkFBdUIsQ0FBQyxRQUFRO1lBQ2pDLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLEtBQUssdUJBQXVCLENBQUMsWUFBWTtZQUNyQyxPQUFPLFlBQVksQ0FBQztRQUN4QixLQUFLLHVCQUF1QixDQUFDLGtCQUFrQjtZQUMzQyxPQUFPLGtCQUFrQixDQUFDO1FBQzlCLEtBQUssdUJBQXVCLENBQUMsa0JBQWtCO1lBQzNDLE9BQU8sa0JBQWtCLENBQUM7UUFDOUIsS0FBSyx1QkFBdUIsQ0FBQyxjQUFjO1lBQ3ZDLE9BQU8sY0FBYyxDQUFDO0tBQzdCO0FBQ0wsQ0FBQztBQWRELGdFQWNDO0FBQ0QsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6QixNQUFNLFFBQVEsR0FBRztJQUNiLEtBQUs7SUFDTCxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDhCQUE4QjtDQUNqQyxDQUFDO0FBQ0YsTUFBTSxTQUFTLEdBQUc7SUFDZCxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixZQUFZO0NBQUMsQ0FBQztBQUNsQixNQUFNLFlBQVksR0FBRztJQUNqQixlQUFlO0lBQ2YsZUFBZTtJQUNmLFVBQVU7SUFDVixXQUFXO0NBQUMsQ0FBQztBQUNqQixNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLFlBQVk7Q0FBQyxDQUFDO0FBQ2xCLE1BQU0sa0JBQWtCLEdBQUc7SUFDdkIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixVQUFVO0lBQ1YsWUFBWTtDQUFDLENBQUM7QUFDbEIsTUFBTSxjQUFjLEdBQUc7SUFDbkIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsV0FBVztDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBFbnVtVHJhY2VyY29uZmlnU2V0dGluZyB7XG4gICAgTm9GaWx0ZXIsXG4gICAgQWxsRmlsdGVyLFxuICAgIE5vQmFzZUZpbHRlcixcbiAgICBOb1JlcG9zaXRvcnlGaWx0ZXIsXG4gICAgTm9Db250cm9sbGVyRmlsdGVyLFxuICAgIE5vU2VydmljRmlsdGVyXG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RW51bVRyYWNlcmNvbmZpZ1NldHRpbmcoaWQ6IEVudW1UcmFjZXJjb25maWdTZXR0aW5nKTogc3RyaW5nW10gfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgY2FzZSBFbnVtVHJhY2VyY29uZmlnU2V0dGluZy5Ob0ZpbHRlcjpcbiAgICAgICAgICAgIHJldHVybiBub0ZpbHRlcjtcbiAgICAgICAgY2FzZSBFbnVtVHJhY2VyY29uZmlnU2V0dGluZy5Ob0Jhc2VGaWx0ZXI6XG4gICAgICAgICAgICByZXR1cm4gbm9CYXNlRmlsdGVyO1xuICAgICAgICBjYXNlIEVudW1UcmFjZXJjb25maWdTZXR0aW5nLk5vUmVwb3NpdG9yeUZpbHRlcjpcbiAgICAgICAgICAgIHJldHVybiBub1JlcG9zaXRvcnlGaWx0ZXI7XG4gICAgICAgIGNhc2UgRW51bVRyYWNlcmNvbmZpZ1NldHRpbmcuTm9Db250cm9sbGVyRmlsdGVyOlxuICAgICAgICAgICAgcmV0dXJuIG5vQ29udHJvbGxlckZpbHRlcjtcbiAgICAgICAgY2FzZSBFbnVtVHJhY2VyY29uZmlnU2V0dGluZy5Ob1NlcnZpY0ZpbHRlcjpcbiAgICAgICAgICAgIHJldHVybiBub1NlcnZpY0ZpbHRlcjtcbiAgICB9XG59XG4vLyBOT1RFOiDnrKzkuIDlgIsq5pivY2xhc3Ms56ys5LqM5YCLKuaYr+aWueazlVxuLy8gTk9URTog5Yqg5LiKIeWwseaYr+S4jeimgSwq5YmN5b6M5bCx5piv6Zec6Y215a2XXG5jb25zdCBub0ZpbHRlciA9IFtcbiAgICAnKjoqJyxcbiAgICAnIUNvbnRleHQqOionLFxuICAgICchU1FMTWFuYWdlcio6Z2V0RGFvKicsXG4gICAgJyFTUUxNYW5hZ2VyKjpnZXREQkN1cnJlbnQqKionXG5dO1xuY29uc3QgYWxsRmlsdGVyID0gW1xuICAgICchKlJlcG9zaXRvcnk6KicsXG4gICAgJyEqQ29udHJvbGxlcjoqJyxcbiAgICAnIUJhc2UqOionLFxuICAgICchKlNlcnZpYzoqJ107XG5jb25zdCBub0Jhc2VGaWx0ZXIgPSBbXG4gICAgJypSZXBvc2l0b3J5OionLFxuICAgICcqQ29udHJvbGxlcjoqJyxcbiAgICAnIUJhc2UqOionLFxuICAgICcqU2VydmljOionXTtcbmNvbnN0IG5vUmVwb3NpdG9yeUZpbHRlciA9IFtcbiAgICAnKlJlcG9zaXRvcnk6ZmluZConLFxuICAgICcqUmVwb3NpdG9yeTphZGQqJyxcbiAgICAnKlJlcG9zaXRvcnk6Y2hhbmdlKicsXG4gICAgJypSZXBvc2l0b3J5OmRlbGV0ZSonLFxuICAgICchKkNvbnRyb2xsZXI6KicsXG4gICAgJyFCYXNlKjoqJyxcbiAgICAnISpTZXJ2aWM6KiddO1xuY29uc3Qgbm9Db250cm9sbGVyRmlsdGVyID0gW1xuICAgICchKlJlcG9zaXRvcnk6KicsXG4gICAgJypDb250cm9sbGVyOionLFxuICAgICchQmFzZSo6KicsXG4gICAgJyEqU2VydmljOionXTtcbmNvbnN0IG5vU2VydmljRmlsdGVyID0gW1xuICAgICchKlJlcG9zaXRvcnk6KicsXG4gICAgJyEqQ29udHJvbGxlcjoqJyxcbiAgICAnIUJhc2UqOionLFxuICAgICcqU2VydmljOionXTtcbiJdfQ==