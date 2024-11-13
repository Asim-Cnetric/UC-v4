const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const WorkspaceController = require('../controllers/workspacesController');
const validate = require("../middleware/validate");
const workspaceSchema = require("../validations/workspace");

const router = express.Router();

router.post('/', authMiddleware, validate(workspaceSchema), WorkspaceController.createWorkspace);
router.get('/', authMiddleware, WorkspaceController.getAllUserWorkspaces);
router.get('/:id', authMiddleware, WorkspaceController.getWorkspaceById);
router.put('/:id', authMiddleware, WorkspaceController.updateWorkspace);
router.delete('/:id', authMiddleware, WorkspaceController.deleteWorkspace);

module.exports = router;
