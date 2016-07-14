defmodule WhosAble.ErrorHelpers do
  @moduledoc """
  Conveniences for translating and building error messages.
  """

  use Phoenix.HTML

  @doc """
  Generates tag for inlined form input errors.
  """
  def error_tag(form, field) do
    if error = form.errors[field] do
      content_tag :span, translate_error(error), class: "help-block"
    end
  end

  def translate_error({msg, opts}) do
    # Because error messages were defined within Ecto, we must
    # call the Gettext module passing our Gettext backend. We
    # also use the "errors" domain as translations are placed
    # in the errors.po file.
    # Ecto will pass the :count keyword if the error message is
    # meant to be pluralized.
    # On your own code and templates, depending on whether you
    # need the message to be pluralized or not, this could be
    # written simply as:
    #
    #     dngettext "errors", "1 file", "%{count} files", count
    #     dgettext "errors", "is invalid"
    #
    if count = opts[:count] do
      Gettext.dngettext(WhosAble.Gettext, "errors", msg, msg, count, opts)
    else
      Gettext.dgettext(WhosAble.Gettext, "errors", msg, opts)
    end
  end

  @doc """
  Convert a changeset's errors to a Map structured like this:
  `%{errors: %{name: ["can't be blank"]}}`
  Supports multiple errors per field. Follows the standard Rails
  error return pattern.
  """
  def for_json(%Ecto.Changeset{} = changeset) do
    %{errors: to_map(changeset)}
  end

  @doc """
  Add a base error message to an errors map.
  """
  def add_base_error(message), do: add_error(%{}, :base, message)
  def add_base_error(errors, message), do: add_error(errors, :base, message)

  @doc """
  Add an error for a custom errors map.
  """
  def add_error(errors, field, message) do
    # add error to the existing error map
    case errors[field] do
      # already has multiple error entries. Add this one to the list.
      list when is_list(list) -> Map.put(errors, field, [message | list])
      # field doesn't exist in map (first occurrance of error)
      nil -> Map.put(errors, field, [message])
    end
  end

  @doc """
  Convert a changeset's errors to a Map structured like this:
  `%{name: ["can't be blank"]}`
  Supports multiple errors per field. Follows the standard Rails
  error return pattern.
  """
  def to_map(%Ecto.Changeset{errors: errors}) do
    Enum.reduce errors, %{}, fn({field, msg}, acc) ->
      add_error(acc, field, WhosAble.ErrorHelpers.translate_error(msg))
    end
  end
end
