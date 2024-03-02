"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminRoutes = (app) => {
    // Profile
    /**
     * @swagger
     * '/api/admin/get-profile':
     *  post:
     *     tags:
     *     - Admin Controller
     *     summary: Create a user
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         description: Authorization token
     *         required: true
     *         schema:
     *           type: string
     *           default: g8xsdg0sx9d8gs90g7sd99g890dfgx8sfg9sd8g7dhbnf8dnpmhpfr8dgp98
     *       - in: query
     *         name: id
     *         description: user id
     *         schema:
     *           type: string
     *           default: xbvfxb87g09ei
     *     responses:
     *      201:
     *        description: Created
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     *
     */
};
exports.default = adminRoutes;
