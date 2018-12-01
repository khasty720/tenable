class Api::V1::ApiController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

end
