const UserController = require('./user.controller');
const CommandController = require('./command.controller');
const AuthController = require('./auth.controller');

module.exports = app => {
  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission non-reg
   *
   * @apiParam {String} email Email.
   * @apiParam {String} password Password.
   *
   * @apiSuccess {Int} id User id.
   * @apiSuccess {Int} api_token Auth token.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "...",
   *    "api_token": "..."
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "Error db."
   *  }
   */
  app.post('/login', AuthController.loginValidator, AuthController.login);

  /**
   * @api {post} /registration Registration
   * @apiName Registration
   * @apiGroup User
   * @apiPermission non-reg
   *
   * @apiParam {String} email Email.
   * @apiParam {String} password Password.
   *
   * @apiSuccess {Int} id User id.
   * @apiSuccess {Int} api_token Auth token.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": "...",
   *    "api_token": "..."
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "User already exists."
   *  }
   */
  app.post('/registration', UserController.registrationValidator, UserController.registration);

  /**
   * @api {post} /command Create new command
   * @apiName CreateCommand
   * @apiGroup Command
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {String} userId User id.
   * @apiParam {String} title Command name.
   *
   * @apiSuccess {Int} id Command id.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": 10
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "User don't exists."
   *  }
   */
  app.post('/command', AuthController.authValidator(1), CommandController.addValidator, CommandController.add);

  /**
   * @api {delete} /command/:id Remove command
   * @apiName RemoveCommand
   * @apiGroup Command
   * @apiPermission moderator
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiParam {Int} id Id.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "Command don't exists."
   *  }
   */
  app.delete('/command/:id', AuthController.authValidator(1), CommandController.deleteValidator, CommandController.deleteById);

  /**
   * @api {get} /me/command Get my commands
   * @apiName MyCommands
   * @apiGroup Command
   * @apiPermission user
   *
   * @apiHeader {String} X-Auth-Token User auth token.
   *
   * @apiSuccess {Array} command Commands list.
   * @apiSuccess {Int} commands.id Id.
   * @apiSuccess {String} commands.title Title.

   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "commands": [command]
   *  }
   *
   * @apiError {String} reason Error reason.
   *
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "reason": "DB error."
   *  }
   */
  app.get('/me/command', AuthController.authValidator(), CommandController.myCommands);
};