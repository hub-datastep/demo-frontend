import { DatabasePredictionConfigModel } from "model/DatabasePredictionConfigModel"
import { TenantModel } from "model/TenantModel"

type ModeT = "wiki" | "databases"

interface UserModel {
  id: string
  username: string
  tenant: TenantModel
  database_prediction_config: DatabasePredictionConfigModel
}

export type { ModeT, UserModel }
