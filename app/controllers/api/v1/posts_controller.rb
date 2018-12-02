class Api::V1::PostsController < Api::V1::ApiController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :authenticate_user!
  load_and_authorize_resource

  # GET /posts
  def index
    @posts = Post.all.order(created_at: :desc)

    render json: PostSerializer.new(@posts, {params: {current_user: current_user}}).serializable_hash
  end

  # POST /posts
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:message, :image_url, :user_id)
    end
end
