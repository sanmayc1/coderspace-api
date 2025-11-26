import { injectable } from "tsyringe";
import { BaseRoute } from "../base-route.js";
import { Request, Response } from "express";
import { problemManagementController } from "../../../di/di-resolver.js";
import { asyncHandler } from "../../../../shared/async-handler.js";

@injectable()
export class ProblemManagementRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/",
      asyncHandler(
        problemManagementController.createProblem.bind(
          problemManagementController
        )
      )
    );
    this.router.get(
      "/",
      asyncHandler(
        problemManagementController.getAllProblems.bind(
          problemManagementController
        )
      )
    );

    this.router.get(
      "/:id",
      asyncHandler(
        problemManagementController.getProblem.bind(
          problemManagementController
        )
      )
    );

    this.router.patch(
      "/",
      asyncHandler(
        problemManagementController.updateProblem.bind(
          problemManagementController
        )
      )
    );

    this.router.patch(
      "/visibility",
      asyncHandler(
        problemManagementController.changeVisibility.bind(
          problemManagementController
        )
      )
    );

    this.router.post(
      "/language",
      asyncHandler(
        problemManagementController.addLanguage.bind(
          problemManagementController
        )
      )
    );
    this.router.get(
      "/:id/language/",
      asyncHandler(
        problemManagementController.getLanguage.bind(
          problemManagementController
        )
      )
    );

    this.router.patch(
      "/language",
      asyncHandler(
        problemManagementController.updateLanguage.bind(
          problemManagementController
        )
      )
    );

    this.router.post(
      "/testcase",
      asyncHandler(
        problemManagementController.addSingleTestcase.bind(
          problemManagementController
        )
      )
    );

    this.router.get(
      "/:id/testcases",
      asyncHandler(
        problemManagementController.getAllTestcases.bind(
          problemManagementController
        )
      )
    );

    this.router.delete(
      "/:id/testcase",
      asyncHandler(
        problemManagementController.deleteTestcase.bind(
          problemManagementController
        )
      )
    );
  }
}
