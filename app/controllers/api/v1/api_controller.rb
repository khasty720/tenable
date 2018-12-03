class Api::V1::ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include CanCan::ControllerAdditions

  rescue_from CanCan::AccessDenied do
    render json: { message: "Access denied." }, status: 403
  end
end
