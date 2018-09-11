export enum ValidStatusCode {
    /**
     * OperatorIdx必須為整數
     * @constant
     */
    OPERATOR_IDX_IS_NUMBER = 'operatorIdx must be number',
    REQDATA_MUST_NOT_EMPTY = 'reqData have to required',
    REQDATA_MUST_EXIST = 'reqData must exist',
    ROLE_IDX_IS_NUMBER = 'roleIdx must be number',
    REQDATA_MISSING_KEYS = 'reqData missing key ',
    OPERATORID_EXIST = 'OperatorID EXIST',
    NOT_ALLOW_THIS_KEY = 'Not Allow This Key: ',
    ROLE_IDX_IS_EXIST = 'roleIdx already exist',
    GROUPIdx_IS_NUMBER = 'groupIdx must be number',
    LOST_KEY = 'lost key '
}
