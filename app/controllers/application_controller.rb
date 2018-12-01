class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }

    def fallback_index_html
      render :file => 'public/index.html'
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :name])
    end
end
