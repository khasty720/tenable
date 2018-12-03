class Api::V1::LikesController < Api::V1::ApiController
  before_action :authenticate_user!
  load_and_authorize_resource

  # POST /likes
  def create
    @like = current_user.likes.new(like_params)

    if @like.save
      render json: @like, status: :created, location: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def remove
    @like = current_user.likes.find_by_post_id(params[:post_id])
    @like.destroy
  end

  private

    # Only allow a trusted parameter "white list" through.
    def like_params
      params.require(:like).permit(:user_id, :post_id)
    end
end
