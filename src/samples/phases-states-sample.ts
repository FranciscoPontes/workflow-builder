interface phaseData {
  id: number,
  app_id?: number,
  active_yn?: string,
  code: string,
  label?: string,
  sort_order: number,
  description?: string | null
  image?: null
}

interface stateData {
  id?: number,
  app_id?: number,
  active_yn?: string,
  transitional_ny?: string,
  pha_id: number,
  code: string,
  label?: string,
  sort_order: number,
  description?: string | null
  image?: null,
  setting_generator?: string | null
}

export const templateData : {
    "phases": Array<phaseData>,
    "states": Array<stateData>
} = {
    "phases": [
      {
        "id": 6181,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "INITIAL",
        "label": "Initial",
        "sort_order": 10,
        "description": null,
        "image": null
      },
      {
        "id": 6182,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "REVIEW",
        "label": "Review",
        "sort_order": 20,
        "description": null,
        "image": null
      },
      {
        "id": 6183,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "EXECUTION",
        "label": "Execution",
        "sort_order": 30,
        "description": null,
        "image": null
      },
      {
        "id": 6184,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "CLOSED",
        "label": "Closed",
        "sort_order": 40,
        "description": null,
        "image": null
      },
      {
        "id": 8603,
        "app_id": 5581,
        "active_yn": "Y",
        "code": "TEST",
        "label": "TEST",
        "sort_order": 50,
        "description": null,
        "image": null
      }
    ],
    "states": [
      {
        "id": 7361,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_DRAFT",
        "label": "Draft",
        "sort_order": 11,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7362,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_MISSING_INFORMATION",
        "label": "Missing information",
        "sort_order": 12,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7363,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6181,
        "code": "INITIAL_SUBMIT",
        "label": "Submit",
        "sort_order": 13,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7364,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_PENDING",
        "label": "Pending",
        "sort_order": 21,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7365,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_APPROVED",
        "label": "Approved",
        "sort_order": 22,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7366,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_REJECTED",
        "label": "Rejected",
        "sort_order": 23,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7367,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6182,
        "code": "REVIEW_MISSING_INFORMATION",
        "label": "Missing information",
        "sort_order": 24,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7368,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6183,
        "code": "EXECUTION_WAITING",
        "label": "Waiting in progress",
        "sort_order": 30,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "id": 7369,
        "app_id": 5581,
        "active_yn": "Y",
        "transitional_ny": "N",
        "pha_id": 6183,
        "code": "EXECUTION_IN_PROGRESS",
        "label": "Review in progress",
        "sort_order": 31,
        "description": null,
        "image": null,
        "setting_generator": null
      },
      {
        "pha_id": 6183,
        "code": "EXECUTION_CANCELED",
        "sort_order": 32,
      },
      {
        "pha_id": 6183,
        "code": "EXECUTION_APPROVED",
        "sort_order": 33,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_CANCELED",
        "sort_order": 41,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_REJECTED",
        "sort_order": 42,
      },
      {
        "pha_id": 6184,
        "code": "CLOSED_COMPLETED",
        "sort_order": 43,
      }
    ]
  }
